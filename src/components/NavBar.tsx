import { Box, Link } from '@chakra-ui/layout';
import { Button, Flex } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';
import { useCurrentUserQuery, useLogoutMutation } from '../generated/graphql';
import { DarkModeSwitch } from './DarkModeSwitch';

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useCurrentUserQuery();
  let body = null;
  // 3 possible states, loading
  if (fetching) {
    console.log('Fetching Data...');

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
      </>
    );
    // user logged in
  } else {
    body = (
      <Flex>
        <Box marginRight={2}>{data.currentUser.username}</Box>
        <Button
          onClick={() => {
            logout();
          }}
          isLoading={logoutFetching}
          variant='link'>
          logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex backgroundColor='lightcoral' p={1}>
      <Box marginLeft={'auto'} padding={'2'}>
        <Box marginRight={4}>{body}</Box>
        <DarkModeSwitch />
      </Box>
    </Flex>
  );
};
