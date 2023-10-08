'use client'

import '@/styles/globals.css';
import { Noto_Sans_KR } from 'next/font/google';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthUserProvider } from '@/client/context/auth_user';

const noto_sans_KR = Noto_Sans_KR({ subsets: ['latin'] });

const RootLayout = ({ children }: { children: React.ReactNode}) => (
  <html lang='ko'>
    <body className={noto_sans_KR.className}>
      <ChakraProvider>
        <AuthUserProvider>
          {children}
        </AuthUserProvider>
      </ChakraProvider>
    </body>
  </html>
);

export default RootLayout;
