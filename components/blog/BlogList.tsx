import React from "react";
import {
  Box,
  Flex,
  Text,
  Image,
  CircularProgress,
  Avatar,
} from "@chakra-ui/react";
import { useBlogs } from "hooks/index";
import moment from "moment";

const BlogList = () => {
  const { blogs, isError, isLoading } = useBlogs();

  return (
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
          {blogs.map(
            ({ id, title, content, featureImageUrl, user, createdAt }: any) => (
              <Box
                key={id}
                boxShadow="0 1px 3px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.06)"
                cursor="pointer"
                borderRadius='.25rem'
                bgColor='white'
                mb={4}
              >
                <Box p={4}>
                  <Flex flexDirection="row" alignItems="center">
                    <Avatar
                      size="md"
                      name="Dan Abrahmov"
                      src={`https://ui-avatars.com/api/?name=${user.username}`}
                    />
                    <Box ml={2}>
                      <Flex flexDirection="row">
                        <Text fontSize="md" fontWeight="bold">
                          {user?.fullName}&nbsp;
                        </Text>
                      </Flex>
                      <Text color="gray.400" fontSize="xs">
                        {moment(createdAt).fromNow()}
                      </Text>
                    </Box>
                  </Flex>

                  {/* Title & Actions */}
                  <Flex mt={3}>
                    <Text fontSize="md" noOfLines={1}>
                      {title}
                    </Text>
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
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                  </Text>
                </Box>
                {/* Content */}

                {featureImageUrl && (
                  <Box position="relative" h="280">
                    <Image
                      alt={title}
                      src={featureImageUrl}
                      w="100%"
                      h="100%"
                      position="absolute"
                      zIndex={1}
                    />
                  </Box>
                )}
                <Box p={4}>
                  <Flex mt={3}>
                    <Text fontSize="md" noOfLines={1}>
                      {title}
                    </Text>
                  </Flex>
                </Box>
              </Box>
            )
          )}
        </React.Fragment>
      )}
    </Box>
  );
};

export default BlogList;
