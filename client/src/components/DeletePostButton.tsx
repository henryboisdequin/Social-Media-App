import { Box, IconButton } from "@chakra-ui/core";
import React from "react";
import { useDeletePostMutation } from "../generated/graphql";

interface DeletePostButtonProps {
  id: number;
}

export const DeletePostButton: React.FC<DeletePostButtonProps> = ({ id }) => {
  const [, deletePost] = useDeletePostMutation();
  return (
    <Box>
      <IconButton
        icon="delete"
        aria-label="Delete Post"
        onClick={() => {
          deletePost({ id });
        }}
      />
    </Box>
  );
};
