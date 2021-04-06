import { NavBar } from '../components/NavBar';
import { withUrqlClient } from 'next-urql';
import { createURQLClient } from '../utils/createURQLClient';
import { usePostsQuery } from '../generated/graphql';

const Index = () => {
  const [{ data }] = usePostsQuery();
  return (
    <>
      <NavBar />
      <div>Hello World</div>
      <br />
      {!data ? null : data.posts.map((p) => <div key={p._id}>{p.title}</div>)}
    </>
  );
};

export default withUrqlClient(createURQLClient, { ssr: true })(Index);
