import { useMemo } from "react";
import { useAuth } from "@/client/context/auth_user";
import styled from "@emotion/styled";
import color from "@/client/color";
import Image from 'next/image';
import Button from "../Button";

const AppHeader = () => {
  const { loading, authUser, signOut, signInWithGoogle } = useAuth();
  const authInitialized = useMemo(() => loading || authUser === null, [loading, authUser]);

  const render = () => authInitialized ? 
    (
      <Button onClick={signInWithGoogle}>
        로그인
      </Button>
    ) : 
    (
      <Button variant='outlined' onClick={signOut}>
        로그아웃
      </Button>
    );

  return (
    <S.AppHeader>
      <S.AppHeaderActions>
        <Image 
          src='/logo.svg' 
          alt='로고' 
          width={32}
          height={32} 
        />
        {render()}
      </S.AppHeaderActions>
    </S.AppHeader>
  )
};

export default AppHeader;

const S = {
  AppHeader: styled('header')`
    height: 59px;
    background-color: ${color.background};
    border-bottom: 1px solid ${color.border};
  `,
  AppHeaderActions: styled('div')`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 400px;
    height: 100%;
    margin: 0 auto;
    padding: 0 8px;
  `,
};
