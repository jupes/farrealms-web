import { ChakraProvider } from '@chakra-ui/react';

import theme from '../theme';
import { AppProps } from 'next/app';
import React from 'react';
import { createClient, Provider } from 'urql';
import { DarkModeSwitch } from '../components/DarkModeSwitch';
import { NavBar } from '../components/NavBar';

const client = createClient({
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include',
  },
});

function MyApp({ Component, pageProps }: any) {
  return (
    <Provider value={client}>
      {/* <DarkModeSwitch />
      <NavBar /> */}
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
