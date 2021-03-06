import { Box, Flex, Heading, Icon, Link, Text } from "@chakra-ui/core";
import moment from "moment";
import NextLink from "next/link";
import React from "react";
import { MeQuery, PostSnippetFragment } from "../generated/graphql";
import { DeletePostButton } from "./DeletePostButton";

interface PostProps {
  meData: MeQuery | undefined;
  post: PostSnippetFragment;
}

export const Post: React.FC<PostProps> = ({ meData, post: p }) => {
  return (
    <Flex key={p.id} p={5} shadow="md" borderWidth="1px" minWidth={400}>
      <Box flex={1}>
        <NextLink
          href={meData?.me?.id ? "/post/[id]" : "/login"}
          as={meData?.me?.id ? `/post/${p.id}` : "/login"}
        >
          <Link>
            <Heading fontSize="xl">{p.title}</Heading>
          </Link>
        </NextLink>
        <Text>Posted By {p.creator.username}</Text>
        <Flex align="center">
          <Text flex={1} mt={4}>
            {p.textSnippet}
          </Text>
          <Box ml="auto">
            <Flex justifyContent="center" alignItems="center">
              <Icon name="calendar" aria-label="Calender" mr={1} />
              <Text>{moment().calendar(p.createdAt)}</Text>
            </Flex>
          </Box>
          {meData?.me?.id === p.creator.id ? (
            <Box ml={4}>
              <DeletePostButton id={p.id} />
            </Box>
          ) : null}
        </Flex>
      </Box>
    </Flex>
  );
};
