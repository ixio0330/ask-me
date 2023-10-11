'use client'

import '@/styles/globals.css';
import { Noto_Sans_KR } from 'next/font/google';
import { AuthUserProvider } from '@/client/context/auth_user';
import Toast from '@/client/components/Toast';

const noto_sans_KR = Noto_Sans_KR({ subsets: ['latin'] });

const RootLayout = ({ children }: { children: React.ReactNode}) => (
  <html lang='ko'>
    <body className={noto_sans_KR.className}>
      <AuthUserProvider>
        {children}
        <Toast />
      </AuthUserProvider>
    </body>
  </html>
);

export default RootLayout;
