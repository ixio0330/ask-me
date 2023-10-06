import { Box, Button, Flex, Spacer } from "@chakra-ui/react";
import { useMemo } from "react";
import { useAuth } from "@/client/context/auth_user";

import color from "../color";

const AppHeader = () => {
  const { loading, authUser, signOut, signInWithGoogle } = useAuth();

  const loginBtn = (
    <Button 
      fontSize='sm'
      fontWeight='600'
      bg='white'
      border={`1px solid ${color.primary}`}
      color={color.primary}
      onClick={signInWithGoogle}
    >
      로그인
    </Button>
  );
  const logoutBtn = (
    <Button 
      fontSize='sm'
      fontWeight='600'
      bg='white'
      border={`1px solid ${color.primary}`}
      color={color.primary}
      onClick={signOut}
    >
      로그아웃
    </Button>
  );
  const authInitialized = useMemo(() => loading || authUser === null, [loading, authUser]);

  return (
    <Box
      backgroundColor='white'
    >
      <Flex
        minH='60px'
        py={{ base: 2 }}
        px={{ base: 4 }}
        align='center'
        maxW='md'
        mx='auto'
      >
        <Spacer />
        <Box flex='1'>
          <img style={{ height: 40 }} src='/logo.svg' alt='로고' />
        </Box>
        <Box justifyContent='flex-end'>
          {
            authInitialized ? 
            loginBtn :
            logoutBtn
          }
        </Box>
      </Flex>
    </Box>
  )
};

export default AppHeader;