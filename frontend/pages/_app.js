import "../styles/globals.css";
import React from "react";
import GlobalState from "../context/GlobalState";

import { ChakraProvider } from "@chakra-ui/react";
import useSWR, { SWRConfig } from "swr";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <GlobalState>
        <Component {...pageProps} />
      </GlobalState>
    </ChakraProvider>
  );
}

export default MyApp;
