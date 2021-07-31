import React from "react";
import {
  Flex,
  Heading,
  Box,
  Text,
  FormControl,
  useToast,
} from "@chakra-ui/react";

const ImageUpload = () => {
  return (
    <Box
      p={2}
      borderColor="inherit"
      borderRadius="0.375rem"
      borderStyle="dashed"
      borderWidth={2}
    >
      <Flex alignItems="center" justifyContent="center" pt={3} pb={3}>
        <Text fontSize="md" color="gray.400">
          Upload image
        </Text>
      </Flex>
    </Box>
  );
};

export default ImageUpload;
