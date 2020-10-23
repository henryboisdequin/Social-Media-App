import { Flex, IconButton } from "@chakra-ui/core";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface UpdootSectionProps {
  post: PostSnippetFragment;
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [, vote] = useVoteMutation();

  return (
    <Flex direction="column" justifyContent="center" alignItems="center" mr={4}>
      <IconButton
        onClick={async () => {
          if (post.likeStatus === true) {
            return;
          }
          await vote({
            postId: post.id,
            value: 1,
          });
        }}
        icon="chevron-up"
        aria-label="Updoot"
        variantColor={post.likeStatus === true ? "green" : undefined}
      />
      {post.likeCount}
      <IconButton
        onClick={async () => {
          if (post.likeStatus === false) {
            return;
          }
          await vote({
            postId: post.id,
            value: -1,
          });
        }}
        icon="chevron-down"
        aria-label="Downdoot"
        variantColor={post.likeStatus === false ? "red" : undefined}
      />
    </Flex>
  );
};
