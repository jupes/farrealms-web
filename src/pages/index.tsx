import { withUrqlClient } from 'next-urql';
import { createURQLClient } from '../utils/createURQLClient';
import { usePostsQuery } from '../generated/graphql';
import { Layout } from '../components/Layout';
import NextLink from 'next/link';
import React from 'react';
import { Link } from '@chakra-ui/react';

const Index = () => {
  const [{ data }] = usePostsQuery();
  return (
    <Layout>
      <NextLink href='/create-post'>
        <Link color='bisque'>Create A Post</Link>
      </NextLink>
      <br />
      {!data ? null : data.posts.map((p) => <div key={p._id}>{p.title}</div>)}
    </Layout>
  );
};

export default withUrqlClient(createURQLClient, { ssr: true })(Index);
