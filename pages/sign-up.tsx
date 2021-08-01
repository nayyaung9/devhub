import React, { useEffect } from "react";
import {
  Box,
  Stack,
  Heading,
  Text,
  Container,
  SimpleGrid,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { Formik } from "formik";
import { InputControl, SubmitButton } from "formik-chakra-ui";
import { signUpValidation } from "utils/form-validation";
import { useRouter } from "next/router";
import { useCurrentUser } from "hooks/index";
import AuthHeader from "components/header/AuthHeader";

const SignUp: NextPage = () => {
  const [user, { mutate }] = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) router.push("/");
  }, [user]);
  
  return (
    <React.Fragment>
      <AuthHeader />

      <Box position={"relative"}>
        <Container
          as={SimpleGrid}
          maxW={"7xl"}
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 10, lg: 32 }}
          py={{ base: 10, sm: 20, lg: 32 }}
        >
          <Stack spacing={{ base: 10, md: 20 }}>
            <Heading
              lineHeight={1.1}
              fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
            >
              Social Network &nbsp;
              <Text
                as={"span"}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text"
              >
                for Programmers and Developers
              </Text>{" "}
            </Heading>
          </Stack>
          <Stack
            bg="white"
            rounded={"xl"}
            p={{ base: 4, sm: 6, md: 8 }}
            spacing={{ base: 8 }}
            maxW={{ lg: "lg" }}
            boxShadow="0 1px 3px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.06)"
            borderRadius=".25rem"
          >
            <Stack spacing={4}>
              <Heading
                color={"gray.800"}
                lineHeight={1.1}
                fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
              >
                DevHub
                <Text
                  as={"span"}
                  bgGradient="linear(to-r, red.400,pink.400)"
                  bgClip="text"
                >
                  !
                </Text>
              </Heading>
              <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
                Build awesome projects with new friends and Launch your products
                Here. Be a better developers.
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
                  const res = await fetch("/api/auth/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values),
                  });

                  if (res.status === 201) {
                    const userObj = await res.json();
                    mutate(userObj);
                    router.push("/");
                  }
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              {({ handleSubmit, values, errors }) => (
                <Box as={"form"} onSubmit={handleSubmit}>
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
                      name="fullName"
                      inputProps={{
                        placeholder: "Full Name",
                        background: "gray.100",
                      }}
                    />

                    <InputControl
                      color={"gray.500"}
                      name="username"
                      inputProps={{
                        placeholder: "Username",
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

                    <InputControl
                      color={"gray.500"}
                      name="passwordConfirmation"
                      inputProps={{
                        placeholder: "Confirm Password",
                        background: "gray.100",
                      }}
                    />
                  </Stack>
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
                </Box>
              )}
            </Formik>
            form
          </Stack>
        </Container>
      </Box>
    </React.Fragment>
  );
};

export default SignUp;
