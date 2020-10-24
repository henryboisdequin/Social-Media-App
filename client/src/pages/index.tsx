import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  CloseButton,
  Flex,
  Stack,
} from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { DeletePostButton } from "../components/DeletePostButton";
import { Layout } from "../components/Layout";
import { Post } from "../components/Post";
import { useMeQuery, usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  });

  const [{ data: meData }] = useMeQuery();

  const [{ data, fetching, error }] = usePostsQuery({
    variables,
  });

  if (!fetching && !data) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr={2}>Error</AlertTitle>
        <AlertDescription>{error?.message}</AlertDescription>
        <CloseButton position="absolute" right="8px" top="8px" />
      </Alert>
    );
  }

  return (
    <Layout>
      {!data && fetching ? (
        <Flex justifyContent="center" alignItems="center">
          <CircularProgress value={30} size="120px" />
        </Flex>
      ) : (
        <Stack spacing={8}>
          {data?.posts.posts.map((p) =>
            !p ? null : <Post meData={meData} post={p} />
          )}
        </Stack>
      )}
      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              });
            }}
            isLoading={fetching}
            m="auto"
            my={8}
          >
            load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

// ssr = server side rendering
export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
