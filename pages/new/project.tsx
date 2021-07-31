import React, { useEffect } from "react";
import { NextPage } from "next";
import Layout from "components/layout/Layout";

import {
  Container,
  Heading,
  Box,
  Stack,
  FormControl,
  FormLabel,
  Select,
  useToast,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { InputControl, SubmitButton, TextareaControl } from "formik-chakra-ui";
import { projectValidation } from "utils/form-validation";
import { useRouter } from "next/router";
import TagsInput from "components/tagInput/TagsInput";
import { useCurrentUser } from "hooks/index";

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

const LaunchProject: NextPage = () => {
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
        <Heading size="md">Launch Project</Heading>
        <Formik
          initialValues={{
            title: "",
            description: "",
            projectUrl: "",
            projectType: "",
            demoUrl: "",
            tags: [],
          }}
          validationSchema={projectValidation}
          onSubmit={async (values) => {
            try {
              let newProject = await fetch("/api/project/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
              });

              const { project } = await newProject.json();
              console.log(project);
              toast({
                title: "Project Uploaded Successfully.",
                description:
                  "Your project is uploaded. You will be redirect soon",
                status: "success",
                duration: 9000,
                isClosable: true,
              });
              if (project) {
                router.push(`/p/${project?.slug}`);
              }
            } catch (error) {
              toast({
                title: "Project Upload Failed.",
                description: "Creating project isn't available right now.",
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
                <FormControl id="title">
                  <InputControl name="title" label="Project Title" />
                </FormControl>
                <FormControl id="projectType">
                  <FormLabel>Project Type</FormLabel>
                  <Select
                    placeholder="Select Project Type"
                    value={values.projectType}
                    name="projectType"
                    borderColor={errors?.projectType ? "#f00" : "inherit"}
                    onChange={(e) =>
                      setFieldValue("projectType", e.target.value)
                    }
                  >
                    {projectTypes.map((type: string) => (
                      <option value={type} key={type}>
                        {type}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl id="description">
                  <TextareaControl name="description" label="Description" />
                </FormControl>
                <FormControl id="projectUrl">
                  <InputControl
                    name="projectUrl"
                    label="Github Repository Url"
                  />
                </FormControl>
                <FormControl id="demoUrl">
                  <InputControl name="demoUrl" label="Project Demo Url" />
                </FormControl>
                <FormControl id="tags">
                  <FormLabel>Project Topic</FormLabel>
                  <TagsInput setTopicFieldState={setFieldValue} />
                </FormControl>
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
                  Create
                </SubmitButton>
              </Stack>
            </Box>
          )}
        </Formik>
      </Container>
    </Layout>
  );
};

export default LaunchProject;
