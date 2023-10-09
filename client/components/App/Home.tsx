'use client'

import GoogleLoginButton from '@/client/components/Button/GoogleLoginButton';
import { useAuth } from '@/client/context/auth_user';
import AppLayout from '@/client/components/App/Layout';
import Image from 'next/image';
import Stack from '@/client/components/Stack';
import Typography from '@/client/components/Typography';

const AppHome = () => {
  const { signInWithGoogle } = useAuth();
  
  return (
    <AppLayout 
      title='Ask Me'
    >
      <Stack style={{ marginTop: 100, textAlign: 'center' }}>
        <Image 
          style={{ margin: '0 auto' }} 
          src='/logo.svg' 
          alt='로고' 
          width={240} 
          height={240} 
        />
        <Typography size='l' weight='b'>Ask Me</Typography>
        <Typography>궁금한 것이 있으면 물어보세요!</Typography>
        <GoogleLoginButton onClick={signInWithGoogle} />
      </Stack>
    </AppLayout>
  )
}

export default AppHome;
