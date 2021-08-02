import Layout from "components/layout/Layout";
import React from "react";
import { useCurrentUser } from "hooks/index";
import {
  Box,
  Flex,
  Heading,
  Avatar,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Text,
} from "@chakra-ui/react";
import BlogList from "components/blog/BlogList";
import ProjectList from "components/projects/ProjectList";
import { useMeBlogs } from "hooks/index";
import BlogSkeleton from "components/skeleton/BlogSkeleton";

const UserProfile = () => {
  const [user] = useCurrentUser();
  const { blogs, isError, isLoading } = useMeBlogs();

  return (
    <Layout>
      <Box bgColor="white" p={4} h="100%">
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          mb={4}
        >
          <Avatar
            size={"lg"}
            src={`https://ui-avatars.com/api/?name=${user?.username}`}
          />
          <Heading fontSize="md" mb={3} mt={3}>
            {user?.fullName}
          </Heading>
          <Heading fontSize="sm" color="gray.400">
            {user?.username}
          </Heading>
        </Flex>
        <Box mb={3} mt={3}>
          <Heading fontSize="md" mb={3} mt={3}>
            About
          </Heading>
          <Text>
            Hi, I am a Mid Software developer at Company.
            <br />
            This is Really good for me.
            <ul>
              <li>Good at JavaScript</li>
              <li>Good at Mongodb</li>
            </ul>
          </Text>
        </Box>
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList>
            <Tab>Blog</Tab>
            <Tab>Projects</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {isError ? (
                <Text align="center" my="10">
                  There was an error while fetching blogs.
                </Text>
              ) : isLoading ? (
                <BlogSkeleton />
              ) : blogs.length === 0 ? (
                <Text align="center" color="gray.400">
                  No Blogs found on DevHub.
                </Text>
              ) : (
                <BlogList blogs={blogs} />
              )}
            </TabPanel>
            <TabPanel>
              <ProjectList />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Layout>
  );
};

export default UserProfile;
