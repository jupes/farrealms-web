import { withUrqlClient } from 'next-urql';
import { createURQLClient } from '../utils/createURQLClient';
import { usePostsQuery } from '../generated/graphql';
import { Layout } from '../components/Layout';
import NextLink from 'next/link';
import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Spinner,
  Stack,
  Text,
  useColorMode,
} from '@chakra-ui/react';

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });
  const [{ data, fetching }] = usePostsQuery({
    variables,
  });
  // TODO: use this chakra hook elsewhere to make things look cool
  const { colorMode } = useColorMode();
  return (
    <Layout>
      <NextLink href='/create-post'>
        <Link color={colorMode === 'dark' ? 'bisque' : 'royalblue'}>
          Create A Post
        </Link>
      </NextLink>
      <br />
      {fetching && !data ? (
        <Spinner color='red.500' />
      ) : (
        <Stack spacing={8}>
          {data?.posts.posts.map((p) => (
            <Box key={p._id} p={5} shadow='md' borderWidth='1px'>
              <Heading fontSize='xl'>{p.title}</Heading>
              <Text marginTop={4}>{p.textSnippet}</Text>
            </Box>
          ))}
        </Stack>
      )}

      {data && data.posts.hasMorePosts ? (
        <Flex>
          <Button
            onClick={() =>
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              })
            }
            isLoading={false}
            margin='auto'
            marginY={2}>
            Load More Posts
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createURQLClient, { ssr: true })(Index);
