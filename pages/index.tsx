import Head from "next/head";
import Layout from "components/layout/Layout";
import BlogList from "components/blog/BlogList";
import { Container, Grid, GridItem, Box } from "@chakra-ui/react";
import ExploreProjectList from "components/projects/ExploreProjectList";

export default function Home() {
  return (
    <Layout>
      <Container maxW="container.xl" mt={3}>
        <Grid templateColumns="repeat(12,minmax(0,1fr))" gap={4}>
          <GridItem colSpan={3}>
            <Box width="120px">hello </Box>
          </GridItem>

          <GridItem colSpan={6}>
            <BlogList />
          </GridItem>

          <GridItem colSpan={3}>
            <ExploreProjectList />
          </GridItem>
        </Grid>
      </Container>
    </Layout>
  );
}
