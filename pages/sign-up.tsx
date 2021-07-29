/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { Formik } from "formik";
import { InputControl, SubmitButton } from "formik-chakra-ui";
import { signUpValidation } from "utils/form-validation";

const SignUp: NextPage = () => {
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <Formik
          initialValues={{
            email: "",
            fullName: "",
            username: "",
            password: "",
            passwordConfirmation: "",
          }}
          validationSchema={signUpValidation}
          onSubmit={async (values) => {
            console.log(values);
            try {
              const user: any = await fetch("/api/auth/register", {
                method: "POST",
                body: JSON.stringify(values),
              });
              console.log(user);
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
                <FormControl id="email">
                  <InputControl name="email" label="Email Address" />
                </FormControl>
                <FormControl id="fullName">
                  <InputControl name="fullName" label="Full Name" />
                </FormControl>
                <FormControl id="username">
                  <InputControl name="username" label="Username" />
                </FormControl>
                <FormControl id="password">
                  <InputControl name="password" label="Password" />
                </FormControl>
                <FormControl id="passwordConfirmation">
                  <InputControl
                    name="passwordConfirmation"
                    label="Confirm Password"
                  />
                </FormControl>
                <Stack spacing={10}>
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
  );
};

export default SignUp;
