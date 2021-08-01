import React, { ReactNode } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Button,
  Menu,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import Link from "next/link";

export default function AuthHeader() {
  const router = useRouter();

  return (
    <>
      <Box bg="white" px={4} borderColor="gray.100" borderWidth={1}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <Box display={{ md: "flex" }}>DevHub</Box>
          </HStack>
          <Flex alignItems={"center"}>
            <Menu>
              <HStack spacing={4} alignItems={"center"}>
                <Button variant="ghost">
                  <Link href="/sign-in">
                    <Text fontSize="sm">Sign In </Text>
                  </Link>
                </Button>
                <Box display={{ md: "block", base: "none" }}>
                  <Button variant="outline">
                    <Link href="/sign-up">
                      <Text fontSize="sm">Sign Up </Text>
                    </Link>
                  </Button>
                </Box>
              </HStack>
            </Menu>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
