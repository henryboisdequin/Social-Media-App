import { Box, Icon, Link, Text } from "@chakra-ui/core";
import NextLink from "next/link";
import React from "react";
import { NavBar } from "../components/NavBar";
import { Wrapper } from "../components/Wrapper";

interface ErrorPageProps {}

const ErrorPage: React.FC<ErrorPageProps> = ({}) => {
  return (
    <>
      <NavBar />
      <Wrapper>
        <Box border="2px" borderColor="black" padding={20}>
          <Text fontSize={60} textAlign="center" fontWeight="bold">
            You are lost!
          </Text>
          <NextLink href="/">
            <Link>
              <Text textAlign="center">
                <Icon name="arrow-forward"></Icon>
                Go back to home
              </Text>
            </Link>
          </NextLink>
        </Box>
      </Wrapper>
    </>
  );
};

export default ErrorPage;
