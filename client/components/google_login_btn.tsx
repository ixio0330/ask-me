import { Box, Button } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onClick: () => void;
}

const GoogleLoginButton = ({ children, onClick }: Props) => {
  return (
    <Box>
      <Button
        size='lg'
        width='full'
        mx='6'
        maxW='md'
        borderRadius='md'
        backgroundColor='white'
        color='#7F52FF'
        colorScheme='none'
        leftIcon={<img src='/google.svg' alt='google 로고' />}
        onClick={onClick}
      >
        { children }
      </Button>
    </Box>
  )
};

export default GoogleLoginButton;