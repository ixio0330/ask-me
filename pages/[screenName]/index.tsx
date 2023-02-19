import ServiceLayout from "@/client/layout/service_layout";
import { Avatar, Box, Button, Flex, Heading, Spacer, Text, Textarea } from "@chakra-ui/react";
import { NextPage } from "next";
import { useState } from "react";
import color from "@/client/color";

const info = {
  uid: 'ixio0330',
  email: 'ixio0330@gmail.com',
  displayName: '서나무',
  photoURL: '',
  description: '주니어 웹 프론트엔드 개발자 서나무입니다.',
};

const UserHomePage: NextPage = () => {
  const [ask, setAsk] = useState('');
  return (
    <ServiceLayout
      title={info.displayName || 'User Home'}
      backgroundColor={color.tertiary}
      minH='100vh'
    >
      <Box
        maxW='md'
        mx='auto'
        mt='8'
        bg={color.white}
        borderRadius='lg'
        padding='20px'
        pos='relative'
        textAlign='center'
      >
        <Box
          background={color.white}
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
            background={color.primary}
          />
        </Box>
        <Box>
          <Heading my='3' size='md'>{info.displayName}</Heading>
          <Text>{info.description}</Text>
          <Textarea
            value={ask}
            onChange={e => setAsk(e.target.value)}
            my='3'
            placeholder='무엇이 궁금한가요?'
            bg={color.tertiary}
            focusBorderColor={color.primary}
            maxLength={200}
            resize='none'
          />
          <Flex>
            <Spacer />
            <Button
              bg={color.primary} 
              color={color.white}
              colorScheme='none'
              isDisabled={ask.length < 1}
            >
              등록
            </Button>
          </Flex>
        </Box>
      </Box>
    </ServiceLayout>
  )
};

export default UserHomePage;