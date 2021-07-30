import React from "react";
import { SimpleGrid, Box, Flex, Text, Tag, Avatar } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";

let items = [
  {
    id: 1,
    title: "Devhub",
    description:
      "Share your awesome projects & knowledges to friends. Be a better developer :)",
    projectUrl: "https://github.com/nayyaung9/devhub",
    demoUrl: "https://github.com/nayyaung9/devhub",
    tags: ["nextjs", "mongodb", "zustand", "serverless", "chakra-ui"],
  },
  {
    id: 2,
    title: "Ox2Home",
    description:
      "📍 A map showing where you can easily and quickly get an oxygen tank for covid patients in Myanmar",
    projectUrl: "",
    demoUrl: "https://github.com/nayyaung9/devhub",
    tags: ["react", "zustand", "chakra-ui"],
  },
  {
    id: 3,
    title: "React Live Streaming",
    description: "Custom Streaming platform is built in React + Redux <3",
    projectUrl: "https://github.com/nayyaung9/devhub",
    demoUrl: "https://github.com/nayyaung9/devhub",
    tags: ["redux", "reactjs", "json-server", "node-media-server"],
  },
];
const ProjectList = () => {
  return (
    <SimpleGrid minChildWidth="200px" spacing="40px">
      {items.map(
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
            <Text fontSize="sm" color="gray.600" mt={2} mb={2} noOfLines={3}>
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

            {/* <Flex justifyContent="flex-start" alignItems="center" mt={3}>
              <Avatar name="Dan Abrahmov" size="md" src="https://bit.ly/dan-abramov" />
              <Box ml={6}>
                <Text>nayyaung9</Text>
              </Box>
            </Flex> */}
          </Box>
        )
      )}
    </SimpleGrid>
  );
};

export default ProjectList;
