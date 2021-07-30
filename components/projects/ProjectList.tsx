import React from "react";
import {
  SimpleGrid,
  Box,
  Flex,
  Text,
  Tag,
  CircularProgress,
} from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { useProjects } from "hooks/index";

const ProjectList = () => {
  const { projects, isError, isLoading } = useProjects();

  return (
    <SimpleGrid minChildWidth="200px" spacing="40px">
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
            ({ id, title, description, projectUrl, demoUrl, tags }: any) => (
              <Box p={4} key={id} boxShadow="md" cursor="pointer">
                {/* Title & Actions */}
                <Flex justifyContent="space-between" alignItems="center">
                  <Text fontSize="md" noOfLines={1}>
                    {title}
                  </Text>
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
                    {demoUrl && (
                      <Text fontSize="sm" display="inline">
                        <a
                          href={demoUrl}
                          target="_blank"
                          title="Demo"
                          rel="noreferrer"
                        >
                          Demo
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
                  {/* {tags.map((tag: string) => (
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
                  ))} */}
                </Flex>
                {/* Topics */}
              </Box>
            )
          )}
        </React.Fragment>
      )}
    </SimpleGrid>
  );
};

export default ProjectList;
