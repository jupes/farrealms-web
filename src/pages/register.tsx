import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useMutation } from 'urql';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';

interface registerProps {}

const REGISTER_MUTATION = `
  mutation Register($username: String!, $password: String!) {
    register(options: { username: $username, password: $password }) {
      errors {
        field
        message
      }
      user {
        _id
        username
        createdAt
        updatedAt
      }
    }
  }
`

const Register: React.FC<registerProps> = ({}) => {
  // the comma ignores the first parameter
  const [, register ] = useMutation(REGISTER_MUTATION);
  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ username: '', password: '', reEnterPassword: '' }}
        onSubmit={(values) => {
          // because my keys in both the parameters and the register mutation are the same I do not need to change here
          register(values)
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

export default Register;
