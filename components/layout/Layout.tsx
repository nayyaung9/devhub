import React from "react";
import Head from "next/head";
import Header from "components/header/Header";
import { Box } from "@chakra-ui/react";

type ILayoutProps = {
  children: React.ReactNode;
};
const Layout = ({ children }: ILayoutProps) => {
  return (
    <React.Fragment>
      <Head>
        <title>Myanmar Developer Hub</title>
      </Head>
      <Header />
      <Box>{children}</Box>
    </React.Fragment>
  );
};

export default Layout;
