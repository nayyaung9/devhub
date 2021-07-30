import type { AppProps } from "next/app";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Myanmar Developer Hub</title>
      </Head>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
};

export default App;
