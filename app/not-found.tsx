'use client'

import { useRouter } from 'next/navigation';
import AppLayout from '@/client/components/App/Layout';
import { Box, Heading, Flex, Text, Button } from '@chakra-ui/react';
import color from '@/client/color';

const NotFound = () => {
  const router = useRouter();

  return (
    <AppLayout 
      title='Ask Me'
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
    </AppLayout>
  )
}

export default NotFound;
