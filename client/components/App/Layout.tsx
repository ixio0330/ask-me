import { ComponentProps } from "react"
import AppHeader from "./Header";
import styled from "@emotion/styled";
import color from "@/client/color";


const AppLayout = ({ title, children, ...props }: ComponentProps<'main'>) => {
  return (
    <S.AppLayout {...props}>
      <AppHeader />
      <S.AppContent>
        {children}
      </S.AppContent>
    </S.AppLayout>
  )
};

export default AppLayout;

const S = {
  AppLayout: styled('main')`
    background-color: ${color.background};
    min-height: 100vh;
  `,
  AppContent: styled('section')`
    max-width: 400px;
    margin: 0 auto;
    padding: 0 16px;
    box-sizing: border-box;
  `,
};
