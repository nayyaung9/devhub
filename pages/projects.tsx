import Head from "next/head";
import Layout from "components/layout/Layout";
import ProjectList from "components/projects/ProjectList";

export default function Projects() {
  return (
    <Layout>
      <Head>
        <title>Explore myanmar developers projects</title>
      </Head>
      <ProjectList />
    </Layout>
  );
}
