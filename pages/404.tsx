import { NextPage } from 'next';
import { useRouter } from 'next/router';
import ServiceLayout from '@/client/layout/service_layout';
import { Box, Heading, Flex, Text, Button } from '@chakra-ui/react';
import color from '@/client/color';

const NotFoundPage: NextPage = () => {
  const router = useRouter();

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
          <Text mt='2'>존재하지 않는 사용자입니다.</Text>
        </Flex>
      </Box>
      <Box mt='20'>
      <Button
          width='full'
          mt='4'
          bg={color.primary} 
          color={color.white}
          colorScheme='none'
          onClick={() => router.back()}
        >
          돌아가기
        </Button>
      </Box>
    </ServiceLayout>
  )
}

export default NotFoundPage;
