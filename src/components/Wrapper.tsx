import { Box } from '@chakra-ui/layout';
import React from 'react';

interface WrapperProps {
  variant?: 'small' | 'regular';
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = 'regular',
}) => {
  return (
    // box element in chakra is like a div with style
    // chakra lets me pass in these styles as props
    <Box
      marginTop={8}
      marginX='auto'
      maxWidth={variant === 'regular' ? '800px' : '400px'}
      width='100%'>
      {children}
    </Box>
  );
};
