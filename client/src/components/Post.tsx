import {
  Box,
  Flex,
  Heading,
  Icon,
  IconButton,
  Link,
  Text,
} from "@chakra-ui/core";
import NextLink from "next/link";
import React from "react";
import { MeQuery, PostSnippetFragment } from "../generated/graphql";
import { DeletePostButton } from "./DeletePostButton";
import moment from "moment";

interface PostProps {
  meData: MeQuery | undefined;
  post: PostSnippetFragment;
}

export const Post: React.FC<PostProps> = ({ meData, post: p }) => {
  return (
    <Flex key={p.id} p={5} shadow="md" borderWidth="1px">
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
          {meData?.me?.id === p.creator.id ? (
            <Box ml="auto">
              <Flex justifyContent="center" alignItems="center">
                <Icon name="calendar" aria-label="Calender" mr={1} />
                <Text>{moment().calendar(p.createdAt)}</Text>
              </Flex>
            </Box>
          ) : null}
          <Box ml={4}>
            <DeletePostButton id={p.id} />
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};
