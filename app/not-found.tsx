'use client'

import { useRouter } from 'next/navigation';
import AppLayout from '@/client/components/App/Layout';
import Image from 'next/image';
import Stack from '@/client/components/Stack';
import Typography from '@/client/components/Typography';
import Button from '@/client/components/Button';

const NotFound = () => {
  const router = useRouter();

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
        <Typography>존재하지 않는 사용자입니다</Typography>
        <Button onClick={() => router.back()}>돌아가기</Button>
      </Stack>
    </AppLayout>
  )
}

export default NotFound;
