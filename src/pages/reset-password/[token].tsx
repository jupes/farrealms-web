import { Box, Button, Flex, Link } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { NextPage } from 'next';
import { withUrqlClient, WithUrqlProps } from 'next-urql';
import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';
import { InputField } from '../../components/InputField';
import { Wrapper } from '../../components/Wrapper';
import { useResetPasswordMutation } from '../../generated/graphql';
import { createURQLClient } from '../../utils/createURQLClient';
import { toErrorMap } from '../../utils/toErrorMap';
import NextLink from 'next/link';

const ResetPassword: NextPage<WithUrqlProps, { token: string }> = ({
  token,
}) => {
  const router = useRouter();
  const [, changePassword] = useResetPasswordMutation();
  const [tokenError, setTokenError] = useState('');
  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ newPassword: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword({
            newPassword: values.newPassword,
            token,
          });
          console.log('RESPONSE DATA ');
          console.log(response);
          if (response.data?.resetPassword.errors) {
            const errorMap = toErrorMap(response.data.resetPassword.errors);
            if ('token' in errorMap) {
              setTokenError(errorMap.token);
            }
            setErrors(errorMap);
          } else if (response.data?.resetPassword.user) {
            console.log('The user came back in data, not null. Good');

            router.push('/');
          } else {
            router.push('/');
          }
        }}>
        {({ isSubmitting }) => (
          //TODO: setup a way to validate that the password entered hasnt been used in some time
          <Form>
            <InputField
              name='newPassword'
              placeholder='Please enter a new password'
              label='New Password'
              type='password'
            />
            {tokenError ? (
              <Flex>
                <Box color='red' marginRight={4}>{tokenError}</Box>
                <NextLink href='/forgot-password'>
                  <Link marginRight={4}>Click to get a new token</Link>
                </NextLink>
              </Flex>
            ) : null}
            <Button
              marginTop={4}
              color='teal'
              type='submit'
              isLoading={isSubmitting}>
              Reset Password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

ResetPassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default withUrqlClient(createURQLClient, { ssr: false })(ResetPassword);
