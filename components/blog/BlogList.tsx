import React from "react";
import { Box, Flex, Text, Image, Avatar, IconButton } from "@chakra-ui/react";
import moment from "moment";
import { FaRegStar } from "react-icons/fa";
import Link from "next/link";

const BlogList = ({ blogs }: any) => {
  return (
    <Box>
      {blogs.map(
        ({
          _id,
          title,
          content,
          featureImageUrl,
          user,
          createdAt,
          slug,
        }: any) => (
          <Box
            key={_id}
            boxShadow="0 1px 3px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.06)"
            borderRadius=".25rem"
            bgColor="white"
            mb={4}
            cursor="pointer"
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
                    <Link href={`/@${user?._id}`} passHref>
                      <Text fontSize="md" fontWeight="bold">
                        {user?.fullName}&nbsp;
                      </Text>
                    </Link>
                  </Flex>
                  <Text color="gray.400" fontSize="xs">
                    {moment(createdAt).fromNow()}
                  </Text>
                </Box>
              </Flex>

              {/* Title & Actions */}
              <Flex mt={3}>
                <Link href={`/@${user?._id}/${_id}`} passHref>
                  <Text fontSize="md" noOfLines={1}>
                    {title}
                  </Text>
                </Link>
              </Flex>
              {/* Title & Actions */}

              {/* Content */}
              <Link href={`/@${user?._id}/${_id}`} passHref>
                <Text
                  fontSize="sm"
                  color="gray.600"
                  mt={2}
                  mb={2}
                  noOfLines={3}
                >
                  <div dangerouslySetInnerHTML={{ __html: content }} />
                </Text>
              </Link>
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
            <Box p={2}>
              <Flex>
                <IconButton
                  borderRadius="full"
                  bgColor="transparent"
                  aria-label="Start-button"
                >
                  <FaRegStar />
                </IconButton>
              </Flex>
            </Box>
          </Box>
        )
      )}
    </Box>
  );
};

export default BlogList;
