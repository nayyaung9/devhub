import React, { useState } from "react";
import {
  Flex,
  Heading,
  Box,
  Text,
  FormControl,
  useToast,
  Image,
} from "@chakra-ui/react";
import { FaUpload } from "react-icons/fa";

const ImageUpload = () => {
  const [previewImg, setPreviewImg] = useState("a");

  const onImageUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(e.target.files)
    // setPreviewImg(URL.createObjectURL(e.target.files));
  };
  return (
    <Box
      p={2}
      bgColor="white"
      borderRadius="0.375rem"
      boxShadow="0 1px 3px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.06)"
      cursor="pointer"
      _hover={{
        boxShadow: "lg",
      }}
      as="label"
      htmlFor="file-upload"
    >
      <input type="file" id="file-upload" hidden onChange={onImageUpload} />
      {previewImg ? (
        <Box position="relative" h="280">
          <Image
            alt="preview-photo"
            src='/test.jpg'
            w="100%"
            h="100%"
            borderRadius="0.375rem"
            position="absolute"
            zIndex={1}
          />
        </Box>
      ) : (
        <Flex
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
          py={5}
        >
          <FaUpload color="gray" fontSize={25} />
          <Text fontSize="md" color="gray.400" mt={3}>
            Upload image
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default ImageUpload;
