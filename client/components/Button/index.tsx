import styled from "@emotion/styled";
import { ComponentProps } from "react";
import Typography from "../Typography";
import color from "@/client/color";

interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'fill' | 'outlined'
}

const Button = ({ children, variant = 'fill', ...props }: ButtonProps) => {
  return (
    <S.Button variant={variant} {...props}>
      <Typography size='s' weight='b' >{children}</Typography>
    </S.Button>
  )
};

export default Button;

const S = {
  Button: styled('button')<ButtonProps>`
    display: inline-flex;
    padding: 12px 24px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    background-color: ${({ variant }) => variant === 'fill' ? color.primary : color.background};
    color: ${({ variant }) => variant === 'fill' ? color.background : color.primary};
    border: 1px solid ${color.primary};
    border-radius: 4px;
  `,
};
