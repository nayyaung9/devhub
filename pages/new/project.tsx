import React, { useEffect } from "react";
import { NextPage } from "next";
import Layout from "components/layout/Layout";
import {
  Container,
  Heading,
  Stack,
  FormControl,
  FormLabel,
  Select,
  useToast,
  Button,
  Input,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/react";
import { projectValidation } from "utils/form-validation";
import { useRouter } from "next/router";
import TagsInput from "components/tagInput/TagsInput";
import { useCurrentUser } from "hooks/index";

// Form Validation
import { signInValidation } from "utils/form-validation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

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

type IProjectPayload = {
  title: string;
  description: string;
  projectType: string;
  projectUrl?: string | null;
  demoUrl?: string | null;
  tags: string[];
};

const LaunchProject: NextPage = () => {
  const toast = useToast();
  const router = useRouter();

  const [user] = useCurrentUser();
  useEffect(() => {
    // redirect to home if user is not authenticated
    if (user === null) router.push("/");
  }, [user]);

  const onSubmit = async (values: IProjectPayload) => {
    try {
      let newProject = await fetch("/api/project/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const { project } = await newProject.json();
      toast({
        title: "Project Uploaded Successfully.",
        description: "Your project is uploaded. You will be redirect soon",
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
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(projectValidation),
  });

  return (
    <Layout>
      <Container mt={3}>
        <Heading size="md">Launch Project</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <FormControl isInvalid={errors.title}>
              <Input id="title" placeholder="Title" {...register("title")} />
              <FormErrorMessage>
                {errors.title && errors.title.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl bgColor="white" id="projectType">
              <Select
                placeholder="Select Project Type"
                {...register("projectType")}
              >
                {projectTypes.map((type: string) => (
                  <option value={type} key={type}>
                    {type}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl isInvalid={errors.description}>
              <Textarea
                id="description"
                placeholder="Description"
                {...register("description")}
              />
              <FormErrorMessage>
                {errors.description && errors.description.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.projectUrl}>
              <Input
                id="projectUrl"
                placeholder="Project Url"
                {...register("projectUrl")}
              />
              <FormErrorMessage>
                {errors.projectUrl && errors.projectUrl.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.demoUrl}>
              <Input
                id="demoUrl"
                placeholder="Demo Url"
                {...register("demoUrl")}
              />
              <FormErrorMessage>
                {errors.demoUrl && errors.demoUrl.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl id="tags">
              <FormLabel>Project Topic</FormLabel>
              {/* <TagsInput setTopicFieldState={} /> */}
            </FormControl>
          </Stack>
          <Stack spacing={10}>
            <Button
              fontFamily={"heading"}
              mt={4}
              w={"full"}
              colorScheme="teal"
              isLoading={isSubmitting}
              type="submit"
            >
              Create
            </Button>
          </Stack>
        </form>
      </Container>
    </Layout>
  );
};

export default LaunchProject;
