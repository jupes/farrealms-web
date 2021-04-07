import { Box, Button, Flex } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect } from 'react';
import { InputField } from '../components/InputField';
import { Layout } from '../components/Layout';
import {
  useCreatePostMutation,
  useCurrentUserQuery,
} from '../generated/graphql';
import { createURQLClient } from '../utils/createURQLClient';
import { useIsAuth } from '../utils/useIsAuth';

const CreatePost: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [, createPost] = useCreatePostMutation();
  // check if the user is authenticated, if not direct to the login screen
  useIsAuth();
  return (
    <Layout variant='small'>
      <Formik
        initialValues={{ title: '', text: '' }}
        onSubmit={async (values, { setErrors }) => {
          const { error } = await createPost({ options: values });
          if (!error) {
            router.push('/');
          }
        }}>
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name='title'
              placeholder='Some Cool Title'
              label='Post Title'
            />
            <Box marginTop={8}>
              <InputField
                textarea
                name='text'
                placeholder='Content goes here...'
                label='Text'
              />
            </Box>
            <Flex align='center'>
              <Button
                marginTop={4}
                marginRight={2}
                color='teal'
                type='submit'
                isLoading={isSubmitting}>
                Post
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createURQLClient, { ssr: false })(CreatePost);
