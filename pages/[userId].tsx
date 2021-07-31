import Layout from "components/layout/Layout";
import React from "react";
import { useCurrentUser } from "hooks/index";
import { Box, Heading } from "@chakra-ui/react";

const UserProfile = () => {
  const [user] = useCurrentUser();

  return (
    <Layout>
      <Box>
        <Heading fontSize="md">{user?.username}</Heading>
      </Box>
    </Layout>
  );
};

export default UserProfile;
