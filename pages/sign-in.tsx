/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import {
  Flex,
  Box,
  FormControl,
  Stack,
  Link,
  FormLabel,
  Input,
  Heading,
  FormErrorMessage,
  Text,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useCurrentUser } from "hooks/index";
import AuthHeader from "components/header/AuthHeader";

type ILoginPayload = {
  email: string;
  password: string;
};

const SignIn: NextPage = () => {
  const [user, { mutate }] = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) router.push("/");
  }, [user]);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values: ILoginPayload) => {
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.status === 201) {
        const userObj = await res.json();
        router.push("/");
        mutate(userObj);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <AuthHeader />
      <Flex
        minH={"90vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign in to your account</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              Thanks for being active on <Link color={"blue.400"}>DevHub</Link>{" "}
              ✌️
            </Text>
          </Stack>

          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                <FormControl isInvalid={errors.email}>
                  <Input
                    id="email"
                    placeholder="Email"
                    {...register("email", {
                      required: "Email is required.",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.password}>
                  <Input
                    id="password"
                    placeholder="Password"
                    {...register("password", {
                      required: "Please enter your password.",
                      minLength: {
                        value: 8,
                        message: "Minimum length should be 8",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.password && errors.password.message}
                  </FormErrorMessage>
                </FormControl>
                <Stack spacing={6}>
                  <Button
                    mt={4}
                    colorScheme="teal"
                    isLoading={isSubmitting}
                    type="submit"
                  >
                    Submit
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </React.Fragment>
  );
};

export default SignIn;
