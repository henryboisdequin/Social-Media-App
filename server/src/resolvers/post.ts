import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Like } from "../entities/Like";
import { Post } from "../entities/Post";
import { User } from "../entities/User";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";

@InputType()
class PostInput {
  @Field()
  title: string;

  @Field()
  text: string;
}

@ObjectType()
class PaginatedPosts {
  @Field(() => [Post])
  posts: Post[];
  @Field()
  hasMore: boolean;
}

@Resolver(Post)
export class PostResolver {
  @FieldResolver(() => String)
  textSnippet(@Root() post: Post) {
    return post.text.slice(0, 75);
  }

  @FieldResolver(() => User)
  creator(@Root() post: Post, @Ctx() { userLoader }: MyContext) {
    return userLoader.load(post.creatorId);
  }

  @FieldResolver(() => Boolean, { nullable: true })
  async voteStatus(@Root() post: Post, @Ctx() { likeLoader, req }: MyContext) {
    if (!req.session.userId) {
      return null;
    }

    const like = await likeLoader.load({
      postId: post.id,
      userId: req.session.userId,
    });

    return like ? like.liked : null;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async like(
    @Arg("postId", () => Int) postId: number,
    @Arg("value", () => Boolean) value: boolean,
    @Ctx() { req }: MyContext
  ) {
    const { userId } = req.session;
    const like = await Like.findOne({ where: { postId, userId } });

    if (like && like.liked !== value) {
      // user voted on post before and changing vote
      await getConnection().transaction(async (tm) => {
        await tm.query(
          `
        update like
        set liked = $1
        where "postId" = $2 and "userId" = $3
        `,
          [value, postId, userId]
        );

        await tm.query(
          `
          update post
          set points = points + $1
          where id = $2
        `,
          [value, postId]
        );
      });
    } else if (!like) {
      // haven't voted before
      await getConnection().transaction(async (tm) => {
        await tm.query(
          `
          insert into like ("userId", "postId", value)
          values ($1,$2,$3)
          `,
          [userId, postId, value]
        );

        await tm.query(
          `   
          update post
          set likes = likes + $1
          where id = $2
          `,
          [value, postId]
        );
      });
    }

    return true;
  }

  @Query(() => PaginatedPosts)
  async posts(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedPosts> {
    const realLimit = Math.min(50, limit);
    const realLimitPlusOne = realLimit + 1;

    const replacements: any[] = [realLimitPlusOne];

    if (cursor) {
      replacements.push(new Date(parseInt(cursor)));
    }

    const posts = await getConnection().query(
      `
    select p.*
    from post p
    ${cursor ? `where p."createdAt" < $2` : ""}
    order by p."createdAt" DESC
    limit $1
    `,
      replacements
    );

    return {
      posts: posts.slice(0, realLimit),
      hasMore: posts.length === realLimitPlusOne,
    };
  }

  @Query(() => Post, { nullable: true })
  post(@Arg("id", () => Int) id: number): Promise<Post | undefined> {
    return Post.findOne(id);
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg("input") input: PostInput,
    @Ctx() { req }: MyContext
  ): Promise<Post> {
    return Post.create({ ...input, creatorId: req.session.userId }).save();
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deletePost(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    // Only delete your posts
    await Post.delete({ id, creatorId: req.session.userId });
    return true;
  }
}
