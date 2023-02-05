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
        width='full'
        px='10'
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