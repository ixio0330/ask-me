import { NextPage } from 'next';
import ServiceLayout from '@/client/layout/service_layout';
import { Box, Heading, Flex, Center } from '@chakra-ui/react';
import GoogleLoginButton from '@/client/components/google_login_btn';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import firebaseClient from '@/common/firebase/client';

const provider = new GoogleAuthProvider();

const IndexPage: NextPage = () => {
  /**
   * * Event/click
   * ? 구글로그인 버튼
   */
  const onClickGoogleLogin = async () => {
    try {
      const res = await signInWithPopup(firebaseClient.Auth, provider);
      console.log(res.user);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <ServiceLayout title='test'>
      <Box maxW='md' mx='auto'>
        <img src='/logo.svg' alt='로고' />
        <Flex justify='center'>
          <Heading>Ask me</Heading>
        </Flex>
      </Box>
      <Center mt='20'>
        <GoogleLoginButton onClick={onClickGoogleLogin}>Google로 시작하기</GoogleLoginButton>
      </Center>
    </ServiceLayout>
  )
}

export default IndexPage;
