import React from "react";
import Layout from "components/layout/Layout";
import { NextPage } from "next";
import { Container, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { useBlogDetail } from "hooks/blog";

const RenderBlogDetail = ({ blog }: any) => {
  console.log(blog);
  return (
    <div>
      <Heading fontSize="lg"> {blog.title}</Heading>

      <div dangerouslySetInnerHTML={{ __html: blog.content }} />
    </div>
  );
};

const BlogDetail: NextPage = ({ data }: any) => {
  const blogId = JSON.parse(data);

  const { blog, isError, isLoading } = useBlogDetail(blogId as string);

  return (
    <Layout>
      <Container maxW="container.lg" mt={3}>
        <Grid templateColumns="repeat(auto-fit, minmax(40px, 1fr))" gap={4}>
          <GridItem colSpan={6}>
            {isError ? (
              <Text align="center" my="10">
                There was an error while fetching blog.
              </Text>
            ) : isLoading ? (
              <Text>Loading</Text>
            ) : !blog ? (
              <Text align="center" color="gray.400">
                Blog Not Found
              </Text>
            ) : (
              <RenderBlogDetail blog={blog} />
            )}
          </GridItem>
          <GridItem colSpan={3} display={{ md: "flex", base: "none" }}>
            <Heading fontSize="md">Based on your interest</Heading>
          </GridItem>
        </Grid>
      </Container>
    </Layout>
  );
};

export async function getServerSideProps(context: any) {
  const { blogId } = context.params;

  return { props: { data: JSON.stringify(blogId) } };
}

export default BlogDetail;
