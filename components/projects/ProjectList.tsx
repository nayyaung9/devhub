import React from "react";
import {
  SimpleGrid,
  Box,
  Flex,
  Text,
  Tag,
  Avatar,
} from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { useProjects } from "hooks/index";
import moment from "moment";
import BlogSkeleton from "components/skeleton/BlogSkeleton";

const ProjectList = () => {
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
    <Box p={4}>
      <SimpleGrid minChildWidth="200px" spacing="40px">
        {isError ? (
          <Text align="center" my="10">
            There was an error while fetching projects.
          </Text>
        ) : isLoading ? (
          <BlogSkeleton />
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
                <Box
                  p={4}
                  key={id}
                  boxShadow="0 1px 3px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.06)"
                  borderRadius=".25rem"
                  bgColor="white"
                >
                  {/* Title & Actions */}
                  <Flex justifyContent="space-between" alignItems="center">
                    <Flex flexDirection="row" alignItems="center">
                      <Text fontSize="md" noOfLines={1}>
                        {title}
                      </Text>
                    </Flex>

                    <Box>
                      {projectUrl && (
                        <Text display="inline">
                          <a
                            href={projectUrl}
                            target="_blank"
                            title="Project"
                            rel="noreferrer"
                          >
                            <FaGithub
                              fontSize={23}
                              style={{ display: "inline", marginRight: 12 }}
                            />
                          </a>
                        </Text>
                      )}
                    </Box>
                  </Flex>
                  {/* Title & Actions */}

                  {/* Content */}
                  <Text
                    fontSize="sm"
                    color="gray.600"
                    mt={2}
                    mb={2}
                    noOfLines={3}
                  >
                    {description}
                  </Text>
                  {/* Content */}

                  {/* Topics */}
                  <Flex spacing={2} flexWrap="wrap">
                    {tags.map((tag: string) => (
                      <div key={tag}>
                        <Tag
                          size="sm"
                          key={tag}
                          borderRadius="full"
                          variant="outline"
                          colorScheme="blue"
                          cursor="pointer"
                          mr={2}
                        >
                          {tag}
                        </Tag>
                      </div>
                    ))}
                  </Flex>
                  {/* Topics */}

                  <Flex flexDirection="row" alignItems="center" mt={4}>
                    <Avatar
                      size="sm"
                      name="Dan Abrahmov"
                      src="https://bit.ly/dan-abramov"
                    />
                    <Box ml={2}>
                      <Flex flexDirection="row">
                        <Text fontSize="md" fontWeight="bold">
                          {user?.username}&nbsp;
                        </Text>

                        <Text fontSize="md">
                          {renderProjectType(projectType)}
                        </Text>
                      </Flex>
                      <Text color="gray.400" fontSize="xs">
                        {moment(createdAt).fromNow()}
                      </Text>
                    </Box>
                  </Flex>
                </Box>
              )
            )}
          </React.Fragment>
        )}
      </SimpleGrid>
    </Box>
  );
};

export default ProjectList;
