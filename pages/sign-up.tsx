import React, { useEffect } from "react";
import {
  Box,
  Stack,
  Heading,
  Text,
  Container,
  SimpleGrid,
  FormControl,
  Input,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCurrentUser } from "hooks/index";
import AuthHeader from "components/header/AuthHeader";

// Form Validation
import { signUpValidation } from "utils/form-validation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

type IRegisterPayload = {
  email: string;
  fullName: string;
  username: string;
  password: string;
  confirmPassword: string;
};

const SignUp: NextPage = () => {
  const [user, { mutate }] = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) router.push("/");
  }, [user]);

  const onSubmit = async (values: IRegisterPayload) => {
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
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signUpValidation),
  });

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

            <Box>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={4}>
                  <FormControl isInvalid={errors.email}>
                    <Input
                      id="email"
                      placeholder="Email"
                      {...register("email")}
                    />
                    <FormErrorMessage>
                      {errors.email && errors.email.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={errors.fullName}>
                    <Input
                      id="fullName"
                      placeholder="Fullname"
                      {...register("fullName")}
                    />
                    <FormErrorMessage>
                      {errors.fullName && errors.fullName.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={errors.username}>
                    <Input
                      id="username"
                      placeholder="Username"
                      {...register("username")}
                    />
                    <FormErrorMessage>
                      {errors.username && errors.username.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={errors.password}>
                    <Input
                      id="password"
                      placeholder="Password"
                      type="password"
                      {...register("password")}
                    />
                    <FormErrorMessage>
                      {errors.password && errors.password.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={errors.passwordConfirmation}>
                    <Input
                      id="passwordConfirmation"
                      placeholder="Confirm Password"
                      type="password"
                      {...register("passwordConfirmation")}
                    />
                    <FormErrorMessage>
                      {errors.passwordConfirmation &&
                        errors.passwordConfirmation.message}
                    </FormErrorMessage>
                  </FormControl>
                </Stack>
                <Button
                  mt={4}
                  bg="brand.dark"
                  colorScheme="brand.white"
                  isLoading={isSubmitting}
                  type="submit"
                  w="full"
                >
                  Submit
                </Button>
              </form>
            </Box>
          </Stack>
        </Container>
      </Box>
    </React.Fragment>
  );
};

export default SignUp;
