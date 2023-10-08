import Head from "next/head";
import { ComponentProps } from "react"
import AppHeader from "./Header";
import styled from "@emotion/styled";
import color from "@/client/color";

interface AppLayoutProps extends ComponentProps<'section'> {
  title: string;
}

const AppLayout = ({ title, children, ...props }: AppLayoutProps) => {
  return (
    <S.AppLayout {...props}>
      <Head>
        <title>{title}</title>
      </Head>
      <AppHeader />
      <S.AppContent>
        {children}
      </S.AppContent>
    </S.AppLayout>
  )
};

export default AppLayout;

const S = {
  AppLayout: styled('section')`
    background-color: ${color.background};
    min-height: 100vh;
  `,
  AppContent: styled('div')`
    max-width: 400px;
    margin: 0 auto;
    padding: 0 8px;
  `,
};
