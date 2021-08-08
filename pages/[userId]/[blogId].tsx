import React from "react";
import Layout from "components/layout/Layout";
import { NextPage } from "next";
import {
  Container,
  Box,
  Grid,
  GridItem,
  Heading,
  Text,
  Image,
  Flex,
  Avatar,
} from "@chakra-ui/react";
import { useBlogDetail } from "hooks/blog";
import ExploreBlogList from "components/blog/ExploreBlogList";
import Link from "next/link";
import moment from "moment";

/**
 * @returns This component show on UI
 */
const RenderBlogDetail = ({ blog }: any) => {
  const { title, user, featureImageUrl, content, createdAt } =
    blog as BlogResponse;

  return (
    <Box borderRadius=".25rem">
      <Heading fontSize="lg" mb={4}>
        {title}
      </Heading>
      <Flex flexDirection="row" alignItems="center" mb={4}>
        <Avatar
          size="md"
          name="Dan Abrahmov"
          rc={`https://ui-avatars.com/api/?name=${user.username}`}
        />
        <Box ml={2}>
          <Flex flexDirection="row">
            <Link href={`/@${user?._id}`} passHref>
              <Text fontSize="md" fontWeight="bold" cursor="pointer">
                {user?.fullName}&nbsp;
              </Text>
            </Link>
          </Flex>
          <Flex flexDirection="row">
            <Text color="gray.400" fontSize="xs">
              {moment(createdAt).fromNow()}
            </Text>
            <span style={{ margin: "0 7px" }}>·</span>
            <Text color="gray.400" fontSize="xs">
              3 min read
            </Text>
          </Flex>
        </Box>
      </Flex>

      <Image src={featureImageUrl} w="100%" h="auto" alt={title} />

      <div dangerouslySetInnerHTML={{ __html: content }} />
    </Box>
  );
};

/**
 * This is a parent component that fetch blog detail data 
 * & send to RenderBlogDetail Components as props.
 */
const BlogDetail: NextPage = ({ data }: any) => {
  const blogId = JSON.parse(data);

  const { blog, isError, isLoading } = useBlogDetail(blogId as string);

  return (
    <Layout>
      <Box bg="white" pt={3}>
        <Container maxW="container.lg">
          <Grid templateColumns="repeat(auto-fit, minmax(40px, 1fr))" gap={4}>
            <GridItem colSpan={8}>
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
            <GridItem colSpan={4} display={{ md: "flex", base: "none" }}>
              <ExploreBlogList />
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
};

export async function getServerSideProps(context: any) {
  const { blogId } = context.params;

  return { props: { data: JSON.stringify(blogId) } };
}

export default BlogDetail;
