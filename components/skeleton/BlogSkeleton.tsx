import {
  HStack,
  Box,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import React from "react";

const BlogSkeletonItem = () => {
  return (
    <Box padding={4} bg="white" mb={4}>
      <HStack>
        <Box>
          <SkeletonCircle height="50px" width="50px" />
        </Box>
        <Box flex="1">
          <Skeleton height={2} width={40} />
          <Skeleton height={2} mt={2} width={20} />
        </Box>
      </HStack>

      <Box flex="1" mt={3}>
        <Skeleton height={2} />

        <SkeletonText noOfLines={3} mt={3} />
      </Box>

      <Skeleton height={40} mt={2} />
    </Box>
  );
};

const BlogSkeleton = () => {
  return (
    <React.Fragment>
      <BlogSkeletonItem />
      <BlogSkeletonItem />
      <BlogSkeletonItem />
    </React.Fragment>
  );
};

export default BlogSkeleton;
