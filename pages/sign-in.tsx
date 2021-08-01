/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import {
  Flex,
  Box,
  FormControl,
  Stack,
  Link,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { Formik } from "formik";
import { InputControl, SubmitButton } from "formik-chakra-ui";
import { signInValidation } from "utils/form-validation";
import { useRouter } from "next/router";
import { useCurrentUser } from "hooks/index";
import AuthHeader from "components/header/AuthHeader";

const SignIn: NextPage = () => {
  const [user, { mutate }] = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) router.push("/");
  }, [user]);

  return (
    <React.Fragment>
      <AuthHeader />
      <Flex
        minH={"90vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"}  px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign in to your account</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              Thanks for being active on <Link color={"blue.400"}>DevHub</Link>{" "}
              ✌️
            </Text>
          </Stack>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={signInValidation}
            onSubmit={async (values) => {
              try {
                const res = await fetch("/api/auth", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(values),
                });

                if (res.status === 201) {
                  const userObj = await res.json();
                  router.push('/')
                  mutate(userObj);
                }
              } catch (error) {
                console.log(error);
              }
            }}
          >
            {({ handleSubmit, values, errors }) => (
              <Box
                as="form"
                rounded={"lg"}
                bg={useColorModeValue("white", "gray.700")}
                boxShadow={"lg"}
                p={8}
                onSubmit={handleSubmit}
              >
                <Stack spacing={4}>
                  <InputControl
                    color={"gray.500"}
                    name="email"
                    inputProps={{
                      placeholder: "Email",
                      background: "gray.100",
                    }}
                  />

                  <InputControl
                    color={"gray.500"}
                    name="password"
                    inputProps={{
                      placeholder: "Password",
                      background: "gray.100",
                    }}
                  />

                  <Stack spacing={6}>
                    <SubmitButton
                      fontFamily={"heading"}
                      mt={4}
                      w={"full"}
                      bgGradient="linear(to-r, red.400,pink.400)"
                      color={"white"}
                      _hover={{
                        bgGradient: "linear(to-r, red.400,pink.400)",
                        boxShadow: "xl",
                      }}
                    >
                      Sign in
                    </SubmitButton>
                  </Stack>
                </Stack>
              </Box>
            )}
          </Formik>
        </Stack>
      </Flex>
    </React.Fragment>
  );
};

export default SignIn;
