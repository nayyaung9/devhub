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
import { signUpValidation } from "utils/form-validation";
import axios from "axios";
import { useRouter } from "next/router";
import { useCurrentUser } from "hooks/index";

const SignUp: NextPage = () => {
  const [user, { mutate }] = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) router.push("/");
  }, [user]);

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
            try {
              // const user: any = await axios.post("/api/auth/register", values);
              // console.log("ui", user.data.user);
              // if (user.status === 201) {
              //   mutate({ user: user.data.user });
              // }


              const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
              });

              if (res.status === 201) {
                const userObj = await res.json();
                console.log('userObj', userObj)
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
