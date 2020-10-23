import DataLoader from "dataloader";
import { Like } from "../entities/Like";

export const createLikeLoader = () =>
  new DataLoader<{ postId: number; userId: number }, Like | null>(
    async (keys) => {
      const likes = await Like.findByIds(keys as any);
      const likeIdsToLikes: Record<string, Like> = {};
      likes.forEach((like) => {
        likeIdsToLikes[`${like.userId}|${like.postId}`] = like;
      });

      return keys.map((key) => likeIdsToLikes[`${key.userId}|${key.postId}`]);
    }
  );
