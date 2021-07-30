import Head from "next/head";
import Layout from "components/layout/Layout";
import { useCurrentUser } from "hooks/index";
import ProjectList from "components/projects/ProjectList";

export default function Home() {
  const [user] = useCurrentUser();
  return (
    <Layout>
      <ProjectList />
    </Layout>
  );
}
