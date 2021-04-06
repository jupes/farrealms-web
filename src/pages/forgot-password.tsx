import { Box, Flex, Button, Link } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { withUrqlClient } from 'next-urql';
import React, { useState } from 'react';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { useForgotPasswordMutation } from '../generated/graphql';
import { createURQLClient } from '../utils/createURQLClient';
import NextLink from 'next/link';

const ForgotPassword: React.FC<{}> = ({}) => {
  const [complete, setComplete] = useState(false);
  const [, forgotPassword] = useForgotPasswordMutation();
  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={async (values) => {
          await forgotPassword(values);
          setComplete(true);
        }}>
        {({ isSubmitting }) =>
          complete ? (
            <Box>
              <Box>
                If an account with that email exists it will recieve an email
                with instructions on how to reset your password
              </Box>
              <NextLink href='/'>
                <Link color='bisque'>Return Home</Link>
              </NextLink>
            </Box>
          ) : (
            <Form>
              <InputField
                name='email'
                placeholder='Please enter your Email'
                label='Email'
                type='email'
              />
              <Button
                marginTop={4}
                marginRight={2}
                color='teal'
                type='submit'
                isLoading={isSubmitting}>
                Email Reset Link
              </Button>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createURQLClient, { ssr: false })(ForgotPassword);
