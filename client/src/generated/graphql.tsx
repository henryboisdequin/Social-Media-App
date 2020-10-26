import gql from "graphql-tag";
import * as Urql from "urql";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: "Query";
  hello: Scalars["String"];
  posts: PaginatedPosts;
  post?: Maybe<Post>;
  me?: Maybe<User>;
};

export type QueryPostsArgs = {
  cursor?: Maybe<Scalars["String"]>;
  limit: Scalars["Int"];
};

export type QueryPostArgs = {
  id: Scalars["Int"];
};

export type PaginatedPosts = {
  __typename?: "PaginatedPosts";
  posts: Array<Post>;
  hasMore: Scalars["Boolean"];
};

export type Post = {
  __typename?: "Post";
  id: Scalars["Float"];
  title: Scalars["String"];
  text: Scalars["String"];
  creatorId: Scalars["Float"];
  creator: User;
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
  textSnippet: Scalars["String"];
};

export type User = {
  __typename?: "User";
  id: Scalars["Float"];
  username: Scalars["String"];
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  createPost: Post;
  deletePost: Scalars["Boolean"];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars["Boolean"];
};

export type MutationCreatePostArgs = {
  input: PostInput;
};

export type MutationDeletePostArgs = {
  id: Scalars["Int"];
};

export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};

export type MutationLoginArgs = {
  password: Scalars["String"];
  username: Scalars["String"];
};

export type PostInput = {
  title: Scalars["String"];
  text: Scalars["String"];
};

export type UserResponse = {
  __typename?: "UserResponse";
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: "FieldError";
  field: Scalars["String"];
  message: Scalars["String"];
};

export type UsernamePasswordInput = {
  username: Scalars["String"];
  password: Scalars["String"];
};

export type PostSnippetFragment = { __typename?: "Post" } & Pick<
  Post,
  "id" | "createdAt" | "updatedAt" | "title" | "text" | "textSnippet"
> & { creator: { __typename?: "User" } & Pick<User, "id" | "username"> };

export type RegularErrorFragment = { __typename?: "FieldError" } & Pick<
  FieldError,
  "field" | "message"
>;

export type RegularUserFragment = { __typename?: "User" } & Pick<
  User,
  "id" | "username"
>;

export type RegularUserResponseFragment = { __typename?: "UserResponse" } & {
  errors?: Maybe<Array<{ __typename?: "FieldError" } & RegularErrorFragment>>;
  user?: Maybe<{ __typename?: "User" } & RegularUserFragment>;
};

export type CreatePostMutationVariables = Exact<{
  input: PostInput;
}>;

export type CreatePostMutation = { __typename?: "Mutation" } & {
  createPost: { __typename?: "Post" } & Pick<
    Post,
    "id" | "createdAt" | "updatedAt" | "title" | "text" | "creatorId"
  >;
};

export type DeletePostMutationVariables = Exact<{
  id: Scalars["Int"];
}>;

export type DeletePostMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "deletePost"
>;

export type LoginMutationVariables = Exact<{
  username: Scalars["String"];
  password: Scalars["String"];
}>;

export type LoginMutation = { __typename?: "Mutation" } & {
  login: { __typename?: "UserResponse" } & RegularUserResponseFragment;
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "logout"
>;

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;

export type RegisterMutation = { __typename?: "Mutation" } & {
  register: { __typename?: "UserResponse" } & RegularUserResponseFragment;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: "Query" } & {
  me?: Maybe<{ __typename?: "User" } & Pick<User, "id" | "username">>;
};

export type PostQueryVariables = Exact<{
  id: Scalars["Int"];
}>;

export type PostQuery = { __typename?: "Query" } & {
  post?: Maybe<
    { __typename?: "Post" } & Pick<
      Post,
      "id" | "createdAt" | "updatedAt" | "title" | "text"
    > & { creator: { __typename?: "User" } & Pick<User, "id" | "username"> }
  >;
};

export type PostsQueryVariables = Exact<{
  limit: Scalars["Int"];
  cursor?: Maybe<Scalars["String"]>;
}>;

export type PostsQuery = { __typename?: "Query" } & {
  posts: { __typename?: "PaginatedPosts" } & Pick<PaginatedPosts, "hasMore"> & {
      posts: Array<{ __typename?: "Post" } & PostSnippetFragment>;
    };
};

export const PostSnippetFragmentDoc = gql`
  fragment PostSnippet on Post {
    id
    createdAt
    updatedAt
    title
    text
    textSnippet
    creator {
      id
      username
    }
  }
`;
export const RegularErrorFragmentDoc = gql`
  fragment RegularError on FieldError {
    field
    message
  }
`;
export const RegularUserFragmentDoc = gql`
  fragment RegularUser on User {
    id
    username
  }
`;
export const RegularUserResponseFragmentDoc = gql`
  fragment RegularUserResponse on UserResponse {
    errors {
      ...RegularError
    }
    user {
      ...RegularUser
    }
  }
  ${RegularErrorFragmentDoc}
  ${RegularUserFragmentDoc}
`;
export const CreatePostDocument = gql`
  mutation CreatePost($input: PostInput!) {
    createPost(input: $input) {
      id
      createdAt
      updatedAt
      title
      text
      creatorId
    }
  }
`;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(
    CreatePostDocument
  );
}
export const DeletePostDocument = gql`
  mutation DeletePost($id: Int!) {
    deletePost(id: $id)
  }
`;

export function useDeletePostMutation() {
  return Urql.useMutation<DeletePostMutation, DeletePostMutationVariables>(
    DeletePostDocument
  );
}
export const LoginDocument = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ...RegularUserResponse
    }
  }
  ${RegularUserResponseFragmentDoc}
`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
}
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument
  );
}
export const RegisterDocument = gql`
  mutation Register($options: UsernamePasswordInput!) {
    register(options: $options) {
      ...RegularUserResponse
    }
  }
  ${RegularUserResponseFragmentDoc}
`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument
  );
}
export const MeDocument = gql`
  query Me {
    me {
      id
      username
    }
  }
`;

export function useMeQuery(
  options: Omit<Urql.UseQueryArgs<MeQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
}
export const PostDocument = gql`
  query Post($id: Int!) {
    post(id: $id) {
      id
      createdAt
      updatedAt
      title
      text
      creator {
        id
        username
      }
    }
  }
`;

export function usePostQuery(
  options: Omit<Urql.UseQueryArgs<PostQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<PostQuery>({ query: PostDocument, ...options });
}
export const PostsDocument = gql`
  query Posts($limit: Int!, $cursor: String) {
    posts(cursor: $cursor, limit: $limit) {
      hasMore
      posts {
        ...PostSnippet
      }
    }
  }
  ${PostSnippetFragmentDoc}
`;

export function usePostsQuery(
  options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<PostsQuery>({ query: PostsDocument, ...options });
}
