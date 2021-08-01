import React, { ReactNode } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  Text,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useCurrentUser } from "hooks/index";
import { useRouter } from "next/router";
import Link from "next/link";
import routeItems from "./routes";

const NavLink = ({ children }: { children: any }) => (
  <Link href={children.route}>{children.name}</Link>
);

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user] = useCurrentUser();
  const router = useRouter();

  const onLogout = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/auth", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (res.status === 204) router.reload();
  };

  return (
    <>
      <Box bg="white" px={4} borderColor="gray.100" borderWidth={1}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            bgColor="transparent"
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box display={{ md: "flex" }}>DevHub</Box>

            <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>DevHub</DrawerHeader>

                <DrawerBody>
                  {routeItems.drawerItems.map((link) => (
                    <NavLink key={link.id}>{link}</NavLink>
                  ))}
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </HStack>
          <Flex alignItems={"center"}>
            <Menu>
              {user ? (
                <React.Fragment>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar
                      size={"sm"}
                      src={`https://ui-avatars.com/api/?name=${user.username}`}
                    />
                  </MenuButton>

                  <MenuList>
                    <Link href={`/@${user._id}`}>
                      <MenuItem>Profile</MenuItem>
                    </Link>

                    <Link href="/new/project">
                      <MenuItem>Launch project</MenuItem>
                    </Link>

                    <Link href="/new/blog">
                      <MenuItem>Create blog</MenuItem>
                    </Link>
                    <MenuDivider />
                    <MenuItem onClick={onLogout}>Logout</MenuItem>
                  </MenuList>
                </React.Fragment>
              ) : (
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
              )}
            </Menu>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
