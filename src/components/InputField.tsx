import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react';

// This is a fancy way to say that I want my components to take any props a regular input field would take
type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};

// theis functions props are of TYPE InputFieldProps, which is defined above, which tells you what your props must be. Very nice
export const InputField: React.FC<InputFieldProps> = ({
  label,
  size: _,
  ...props
}) => {
  const [field, { error }] = useField(props);
  return (
    //   double exclamation casts string to boolean, since isInvalid does not take type string
    <FormControl isInvalid={!!error}>
      {/* htmlFor in FormLabel matches the id in Input */}
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input
        {...field}
        {...props}
        id={field.name}
        placeholder={props.placeholder}
      />
      {/* If you see an error, show the error, otherwise null.  */}
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
