import Head from "next/head";
import Layout from "components/layout/Layout";
import BlogList from "components/blog/BlogList";
import {
  Container,
  Grid,
  GridItem,
  Box,
  Flex,
  Icon,
  Text,
} from "@chakra-ui/react";
import ExploreProjectList from "components/projects/ExploreProjectList";
import { FaHome, FaSave } from "react-icons/fa";

const routes = [
  {
    id: 1,
    name: "Home",
    icon: FaHome,
  },
  {
    i: 2,
    name: "Saved Posts",
    icon: FaSave,
  },
];
export default function Home() {
  return (
    <Layout>
      <Container maxW="container.xl" mt={3}>
        <Grid templateColumns="repeat(auto-fit, minmax(40px, 1fr))" gap={4}>
          <GridItem colSpan={3} display={{ md: "flex", base: "none" }}>
            <Box>
              {routes.map((route) => (
                <Flex key={route.id} mb={3}>
                  <Icon as={route.icon} fontSize="xl" />

                  <Text fontSize="md" ml={4}>
                    {route.name}
                  </Text>
                </Flex>
              ))}
            </Box>
          </GridItem>

          <GridItem colSpan={6}>
            <BlogList />
          </GridItem>

          <GridItem colSpan={3} display={{ md: "block", base: "none" }}>
            <ExploreProjectList />
          </GridItem>
        </Grid>
      </Container>
    </Layout>
  );
}
