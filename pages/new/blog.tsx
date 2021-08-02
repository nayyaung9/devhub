import React, { useEffect } from "react";
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
} from "@chakra-ui/react";
import { Formik } from "formik";
import { InputControl, SubmitButton, TextareaControl } from "formik-chakra-ui";
import { blogValidation } from "utils/form-validation";
import { useRouter } from "next/router";
import { useCurrentUser } from "hooks/index";
import ImageUpload from "components/imageUpload/imageUpload";

const Editor = dynamic(() => import("components/editor/Editor"), {
  ssr: false,
});
/**
 * Here I set string array instead of array objects
 * Cause I am really boring :3
 */
const projectTypes: string[] = [
  "Launch",
  "Invite Collaborator",
  "Need Suggestion",
  "Ask for Help",
];

const LaunchBlog: NextPage = () => {
  const toast = useToast();
  const router = useRouter();

  const [user] = useCurrentUser();
  useEffect(() => {
    // redirect to home if user is not authenticated
    if (user === null) router.push("/");
  }, [user]);

  return (
    <Layout>
      <Container mt={3}>
        <Heading size="md">Share your knowledge</Heading>
        <Formik
          initialValues={{
            title: "",
            content: "",
            featureImageUrl: "",
          }}
          validationSchema={blogValidation}
          onSubmit={async (values) => {
            console.log(values);
            try {
              // let newblog = await fetch("/api/blog/create", {
              //   method: "POST",
              //   headers: { "Content-Type": "application/json" },
              //   body: JSON.stringify(values),
              // });

              // const { blog } = await newblog.json();
              // console.log(blog);
              toast({
                title: "Blog Uploaded Successfully.",
                description: "Your Blog is uploaded. You will be redirect soon",
                status: "success",
                duration: 9000,
                isClosable: true,
              });
              // if (blog) {
              //   router.push(`/p/${blog?.slug}`);
              // }
            } catch (error) {
              toast({
                title: "Blog Upload Failed.",
                description: "Creating blog isn't available right now.",
                status: "error",
                duration: 9000,
                isClosable: true,
              });
            }
          }}
        >
          {({ handleSubmit, values, errors, setFieldValue }) => (
            <Box as="form" onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <FormControl id="title" mt={5}>
                  <InputControl
                    name="title"
                    inputProps={{
                      placeholder: "Type your title",
                      bgColor: "white",
                    }}
                  />
                </FormControl>
                <FormControl id="description" bgColor="white">
                  <Editor
                    content={values.content}
                    onSetFieldChange={setFieldValue}
                  />
                </FormControl>

                <ImageUpload />
              </Stack>
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
                  Submit
                </SubmitButton>
              </Stack>
            </Box>
          )}
        </Formik>
      </Container>
    </Layout>
  );
};

export default LaunchBlog;
