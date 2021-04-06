import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { useRegisterMutation } from '../generated/graphql';
import { createURQLClient } from '../utils/createURQLClient';
import { toErrorMap } from '../utils/toErrorMap';

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  // the comma ignores the first parameter
  const [, register] = useRegisterMutation();
  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          // because my keys in both the parameters and the register mutation are the same I do not need to change here
          const response = await register(values);
          console.log('RESPONSE DATA ');
          console.log(response);
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else {
            // User was registered without error
            router.push('/');
          }
        }}>
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name='username'
              placeholder='Please enter a username'
              label='Username'
            />
            <Box marginTop={8}>
              <InputField
                name='password'
                placeholder='Please enter a password'
                label='Password'
                type='password'
              />
            </Box>
            <Button
              marginTop={4}
              color='teal'
              type='submit'
              isLoading={isSubmitting}>
              register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createURQLClient, { ssr: false })(Register);
