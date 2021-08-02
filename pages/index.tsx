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
  Button,
} from "@chakra-ui/react";
import ExploreProjectList from "components/projects/ExploreProjectList";
import { FaHome, FaSave } from "react-icons/fa";
import { useBlogs } from "hooks/index";
import BlogSkeleton from "components/skeleton/BlogSkeleton";

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
  const { blogs, isError, isLoading } = useBlogs();

  return (
    <Layout>
      <Container maxW="container.xl" mt={3}>
        <Grid templateColumns="repeat(auto-fit, minmax(40px, 1fr))" gap={4}>
          <GridItem colSpan={3} display={{ md: "flex", base: "none" }}>
            <Box w="full">
              {routes.map((route) => (
                <Flex key={route.id} mb={3}>
                  <Button>

             
                  <Icon as={route.icon} fontSize="xl" />

                  <Text fontSize="md" ml={4}>
                    {route.name}
                  </Text>
                  </Button>
                </Flex>
              ))}
            </Box>
          </GridItem>

          {/* Rendering Blog List Item  */}
          <GridItem colSpan={6}>
            {isError ? (
              <Text align="center" my="10">
                There was an error while fetching blogs.
              </Text>
            ) : isLoading ? (
              <BlogSkeleton />
            ) : blogs.length === 0 ? (
              <Text align="center" color="gray.400">
                No Blogs found on DevHub.
              </Text>
            ) : (
              <BlogList blogs={blogs} />
            )}
          </GridItem>
          {/* Rendering Blog List Item  */}

          <GridItem colSpan={3} display={{ md: "block", base: "none" }}>
            <ExploreProjectList />
          </GridItem>
        </Grid>
      </Container>
    </Layout>
  );
}
