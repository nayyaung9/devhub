import Head from "next/head";
import Layout from "components/layout/Layout";
import { useCurrentUser } from "hooks/index";

export default function Home() {
  const [user] = useCurrentUser();
  console.log(user)
  return (
    <Layout>
    Home
    </Layout>
  );
}
