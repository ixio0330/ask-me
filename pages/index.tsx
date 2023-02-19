import { NextPage } from 'next';
import ServiceLayout from '@/client/layout/service_layout';
import { Box, Heading, Flex, Text } from '@chakra-ui/react';
import GoogleLoginButton from '@/client/components/google_login_btn';
import { useAuth } from '@/client/context/auth_user';
import color from '@/client/color';

const IndexPage: NextPage = () => {
  const { signInWithGoogle } = useAuth();
  
  return (
    <ServiceLayout 
      title='Ask Me'
      backgroundColor={color.tertiary}
      minH='100vh'
    >
      <Box maxW='md' mt='20'>
        <img src='/logo.svg' alt='로고' />
        <Flex 
          align='center'
          justify='center' 
          direction='column'
          mt='10'
        >
          <Heading>Ask Me</Heading>
          <Text>궁금한 것이 있으면 물어보세요!</Text>
        </Flex>
      </Box>
      <Box mt='20'>
        <GoogleLoginButton onClick={signInWithGoogle}>Google로 시작하기</GoogleLoginButton>
      </Box>
    </ServiceLayout>
  )
}

export default IndexPage;
