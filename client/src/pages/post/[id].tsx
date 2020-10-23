import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../../components/Layout";
import { useMeQuery, usePostQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { Box, Heading } from "@chakra-ui/core";
import { UpdootSection } from "../../components/UpdootSection";
import { EditDeletePostButtons } from "../../components/EditDeletePostButtons";
import { useGetPostFromUrl } from "../../utils/useGetPostFromUrl";

interface PostProps {}

const Post: React.FC<PostProps> = ({}) => {
  const [{ data, error, fetching }] = useGetPostFromUrl();
  const [{ data: userData }] = useMeQuery();

  if (error) {
    console.error(error.message);
  }

  if (fetching) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    );
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>Could not find post.</Box>
      </Layout>
    );
  }

  const heading = `${data.post.title} by ${data.post.creator.username}`;

  return (
    <Layout>
      <Heading mb={4}>{heading}</Heading>
      <Box mb={4}>{data.post.text}</Box>
      {userData?.me?.id !== data.post.creator.id ? null : (
        <EditDeletePostButtons id={data.post.id} />
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
