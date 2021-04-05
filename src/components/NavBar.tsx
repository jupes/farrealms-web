import { Box, Link } from '@chakra-ui/layout';
import { Flex } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';
import { useCurrentUserQuery } from '../generated/graphql';
import { DarkModeSwitch } from './DarkModeSwitch';

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useCurrentUserQuery();
  let body = null;
  // 3 possible states, loading
  if (fetching) {
    // user not logged in
  } else if (!data?.currentUser) {
    body = (
      <>
        <NextLink href='/login'>
          <Link marginRight={4}>Login</Link>
        </NextLink>
        <NextLink href='/register'>
          <Link marginRight={4}>Register</Link>
        </NextLink>
        <NextLink href='/'>
          <Link marginRight={4}>Home</Link>
        </NextLink>
      </>
    );
    // user logged in
  } else {
    body = data.currentUser.username;
  }

  return (
    <Flex backgroundColor='tomato' p={1}>
      <Box marginLeft={'auto'} padding={'2'}>
        <Box marginRight={4}>{body}</Box>

        <DarkModeSwitch />
      </Box>
    </Flex>
  );
};
