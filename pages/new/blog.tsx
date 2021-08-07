import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import Layout from "components/layout/Layout";
import dynamic from "next/dynamic";
import {
  Container,
  Heading,
  Box,
  Stack,
  FormControl,
  useToast,
  FormErrorMessage,
  Input,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCurrentUser } from "hooks/index";
import ImageUpload from "components/imageUpload/imageUpload";

// Form Validation
import { blogValidation } from "utils/form-validation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const Editor = dynamic(() => import("components/editor/Editor"), {
  ssr: false,
});

type IBlogPayload = {
  title: string;
  content: string;
};

const LaunchBlog: NextPage = () => {
  const toast = useToast();
  const router = useRouter();
  const [state, setState] = useState({
    content: "",
  });

  const [user] = useCurrentUser();
  useEffect(() => {
    // redirect to home if user is not authenticated
    if (user === null) router.push("/");
  }, [user]);

  const onSubmit = async (values: IBlogPayload) => {
    try {
      let newblog = await fetch("/api/blog/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const { blog } = await newblog.json();

      toast({
        title: "Blog Uploaded Successfully.",
        description: "Your Blog is uploaded. You will be redirect soon",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      if (blog) {
        router.push(`/p/${blog?.slug}`);
      }
    } catch (error) {
      toast({
        title: "Blog Upload Failed.",
        description: "Creating blog isn't available right now.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(blogValidation),
  });

  return (
    <Layout>
      <Container mt={3}>
        <Heading size="md">Share your knowledge</Heading>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <FormControl isInvalid={errors.title}>
              <Input id="title" placeholder="Title" {...register("title")} />
              <FormErrorMessage>
                {errors.title && errors.title.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl id="description" bgColor="white">
              <Editor content={state.content} onChange={setState} />
            </FormControl>

            <ImageUpload />
          </Stack>
          <Stack spacing={10}>
            <Button
              mt={4}
              w={"full"}
              colorScheme="teal"
              isLoading={isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </Stack>
        </form>
      </Container>
    </Layout>
  );
};

export default LaunchBlog;
