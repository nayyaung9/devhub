import Layout from "components/layout/Layout";
import React from "react";
import { useCurrentUser } from "hooks/index";
import { Box, Flex, Heading, Avatar } from "@chakra-ui/react";

const UserProfile = () => {
  const [user] = useCurrentUser();

  return (
    <Layout>
      <Box p={4}>
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Avatar
            size={"lg"}
            src={`https://ui-avatars.com/api/?name=${user?.username}`}
          />
             <Heading fontSize="md" mb={3} mt={3}>{user?.fullName}</Heading>
          <Heading fontSize="sm" color='gray.400'>{user?.username}</Heading>
        </Flex>
      </Box>
    </Layout>
  );
};

export default UserProfile;
