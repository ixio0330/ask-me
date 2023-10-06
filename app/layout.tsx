'use client'

import '@/styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthUserProvider } from '@/client/context/auth_user';

const RootLayout = ({ children }: { children: React.ReactNode}) => (
  <html lang='ko'>
    <body>
      <ChakraProvider>
        <AuthUserProvider>
          {children}
        </AuthUserProvider>
      </ChakraProvider>
    </body>
  </html>
);

export default RootLayout;
