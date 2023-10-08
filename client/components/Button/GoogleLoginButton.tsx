import { ComponentProps } from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import Button from ".";
import color from "@/client/color";

const GoogleLoginButton = ({ onClick }: ComponentProps<'button'>) => {
  return (
    <S.GoogleLoginButton
      variant='outlined' 
      onClick={onClick}
    >
      <Image width={18} height={18} src='/google.svg' alt='Google 로고'/>
      구글로 시작하기
    </S.GoogleLoginButton>
  )
};

export default GoogleLoginButton;

const S = {
  GoogleLoginButton: styled(Button)`
    width: 100%;
    background: ${color.white};
  `,
};
