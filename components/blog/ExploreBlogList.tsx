import React from "react";
import {
  Box,
  Text,
  CircularProgress,
  Divider,
  Heading,
  Flex,
  Avatar,
} from "@chakra-ui/react";
import { useBlogs } from "hooks/index";
import moment from "moment";
import Link from "next/link";

const ExploreBlogList = () => {
  const { blogs, isError, isLoading } = useBlogs();

  return (
    <Box
      bgColor="white"
      position="sticky"
      top="20px"
    >
      <Box p={4}>
        <Link href="/projects" passHref={true}>
          <Heading fontSize="md">Base on your interest</Heading>
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
        ) : blogs.length === 0 ? (
          <Text align="center" color="gray.400">
            No Projects found on DevHub.
          </Text>
        ) : (
          <React.Fragment>
            {blogs.map(({ id, title, user, createdAt }: any) => (
              <React.Fragment key={id}>
                <Box p={4}>
                  <Text fontSize="md" noOfLines={2}>
                    {title}
                  </Text>
                  <Flex flexDirection="row" alignItems="center" mt={2}>
                    <Avatar
                      size="md"
                      name="Dan Abrahmov"
                      src={`https://ui-avatars.com/api/?name=${user.username}`}
                    />
                    <Box ml={2}>
                      <Flex flexDirection="row">
                        <Link href={`/@${user?._id}`} passHref>
                          <Text
                            fontSize="md"
                            fontWeight="bold"
                            cursor="pointer"
                          >
                            {user?.fullName}&nbsp;
                          </Text>
                        </Link>
                      </Flex>
                      <Text color="gray.400" fontSize="xs">
                        {moment(createdAt).fromNow()}
                      </Text>
                    </Box>
                  </Flex>
                </Box>

                <Divider />
              </React.Fragment>
            ))}
          </React.Fragment>
        )}
      </Box>
    </Box>
  );
};

export default ExploreBlogList;
