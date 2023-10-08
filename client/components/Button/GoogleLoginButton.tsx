import { ComponentProps } from "react";
import Image from "next/image";
import Button from ".";
import Typography from "../Typography";
import color from "@/client/color";

const GoogleLoginButton = ({ onClick }: ComponentProps<'button'>) => {
  return (
    <Button 
      variant='outlined' 
      onClick={onClick}
      style={{ width: '100%', background: color.white }}
    >
      <Image width={18} height={18} src='/google.svg' alt='Google 로고'/>
      <Typography>Google로 시작하기</Typography>
    </Button>
  )
};

export default GoogleLoginButton;
