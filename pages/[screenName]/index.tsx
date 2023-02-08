import ServiceLayout from "@/client/layout/service_layout";
import { Avatar, Box, Flex, Heading, Text } from "@chakra-ui/react";
import { NextPage } from "next";

const info = {
  uid: 'ixio0330',
  email: 'ixio0330@gmail.com',
  displayName: '서나무',
  photoURL: '',
  description: '주니어 웹 프론트엔드 개발자 서나무입니다.',
}

const UserHomePage: NextPage = () => {
  return (
    <ServiceLayout
      title={info.displayName || 'User Home'}
      backgroundColor='#ECE6FD'
      minH='100vh'
    >
      <Box
        maxW='md'
        mx='auto'
        mt='8'
        bg='white'
        borderRadius='lg'
        padding='20px'
        pos='relative'
        textAlign='center'
      >
        <Box
          background='white'
          pos='absolute'
          left='calc(50% - 30px)'
          top='-8'
          width='60px'
          height='60px'
          borderRadius='50%'
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <Avatar 
            width='52px'
            height='52px' 
            src={info.photoURL} 
            background='#7F52FF'
          />
        </Box>
        <Box>
          <Heading size='md'>{info.displayName}</Heading>
          <Text>{info.description}</Text>
        </Box>
      </Box>
    </ServiceLayout>
  )
};

export default UserHomePage;