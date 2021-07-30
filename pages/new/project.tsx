import React from "react";
import { NextPage } from "next";
import Layout from "components/layout/Layout";
import {
  Container,
  Heading,
  Box,
  Stack,
  FormControl,
  Select,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { InputControl, SubmitButton, TextareaControl } from "formik-chakra-ui";
import { projectValidation } from "utils/form-validation";

const LaunchProject: NextPage = () => {
  return (
    <Layout>
      <Container>
        <Heading size="md">Launch Project</Heading>
        <Formik
          initialValues={{
            title: "",
            description: "",
            projectUrl: "",
            demoUrl: "",
            tags: "",
          }}
          validationSchema={projectValidation}
          onSubmit={async (values) => {
            console.log(values);
          }}
        >
          {({ handleSubmit, values, errors }) => (
            <Box as="form" p={2} onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <FormControl id="title">
                  <InputControl name="title" label="Project Title" />
                </FormControl>
                <FormControl id="projectType">
                  <Select placeholder="Select option">
                    <option value="option3">Launch</option>
                    <option value="option1">Need Collaborator</option>
                    <option value="option2">Need Suggestion</option>
                    <option value="option3">Ask for Help</option>
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
                  <InputControl name="tags" label="Topics" />
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
