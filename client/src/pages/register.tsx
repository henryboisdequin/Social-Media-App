import { Box, Button, Link } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { Wrapper } from "../components/Wrapper";
import { useRegisterMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { toErrorMap } from "../utils/toErrorMap";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [, register] = useRegisterMutation();

  return (
    <Layout>
      <Wrapper variant="small">
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await register({ options: values });
            console.log(response);

            if (response.data?.register.errors) {
              // errors
              setErrors(toErrorMap(response.data.register.errors));
            } else if (response.data?.register.user) {
              // if worked
              router.push("/");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                name="username"
                placeholder="username"
                label="Username"
              />

              <Box mt={4}>
                <InputField
                  name="password"
                  placeholder="password"
                  label="Password"
                  type="password"
                />
              </Box>
              <Box mt={2}>
                <NextLink href="/login">
                  <Link ml="auto" style={{ color: "grey" }}>
                    Already a user?
                  </Link>
                </NextLink>
              </Box>
              <Button
                mt={4}
                type="submit"
                variantColor="teal"
                isLoading={isSubmitting}
              >
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
