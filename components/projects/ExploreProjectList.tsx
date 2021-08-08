import React from "react";
import {
  Box,
  Text,
  CircularProgress,
  Divider,
  Heading,
  Flex,
  Tag,
  TagLabel,
  HStack,
} from "@chakra-ui/react";
import { useProjects } from "hooks/index";
import moment from "moment";
import Link from "next/link";

const ExploreProjectList = () => {
  const { projects, isError, isLoading } = useProjects();

  const renderProjectType = (type: string) => {
    switch (type?.toLocaleLowerCase()) {
      case "launch":
        return "launched";
      case "invite collaborator":
        return "invite collaborator";
      case "need suggestion":
        return "need suggestion";
      case "ask for help":
        return "ask for help";
      default:
        return "has launched";
    }
  };

  return (
    <Box
      bgColor="white"
      boxShadow="0 1px 3px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.06)"
      borderRadius=".25rem"
      position="sticky"
      top="20px"
    >
      <Box p={4}>
        <Link href="/projects" passHref={true}>
          <Heading fontSize="md">Explore Awesome Projects</Heading>
        </Link>
      </Box>

      <Divider />
      <Box>
        {isError ? (
          <Text align="center" my="10">
            There was an error while fetching projects.
          </Text>
        ) : isLoading ? (
          <CircularProgress isIndeterminate color="green.300" />
        ) : projects.length === 0 ? (
          <Text align="center" color="gray.400">
            No Projects found on DevHub.
          </Text>
        ) : (
          <React.Fragment>
            {projects.map(
              ({
                id,
                title,
                description,
                projectUrl,
                projectType,
                tags,
                user,
                createdAt,
              }: any) => (
                <React.Fragment key={id}>
                  <Box p={4}>
                    <Text fontSize="md" noOfLines={2}>
                      {title}
                    </Text>
                    <HStack spacing={2} mt={2}>
                      <Tag
                        size="sm"
                        borderRadius="full"
                        variant="outline"
                        colorScheme="blue"
                        cursor="pointer"
                      >
                        <TagLabel> {renderProjectType(projectType)}</TagLabel>
                      </Tag>
                      <Text color="gray.400" fontSize="xs">
                        {moment(createdAt).fromNow()}
                      </Text>
                    </HStack>
                  </Box>

                  <Divider />
                </React.Fragment>
              )
            )}
          </React.Fragment>
        )}
      </Box>
    </Box>
  );
};

export default ExploreProjectList;
