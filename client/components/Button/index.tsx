import styled from "@emotion/styled";
import { ComponentProps } from "react";
import color from "@/client/color";
import { fontsize, fontweight } from "../Typography";

interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'fill' | 'outlined';
  size?: keyof typeof fontsize;
  weight?: keyof typeof fontweight;
}

const Button = ({ children, variant = 'fill', ...props }: ButtonProps) => {
  return (
    <S.Button variant={variant} {...props}>
      {children}
    </S.Button>
  )
};

export default Button;

const S = {
  Button: styled('button')<ButtonProps>`
    display: flex;
    padding: 12px 24px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    background-color: ${({ variant }) => variant === 'fill' ? color.primary : color.background};
    color: ${({ variant }) => variant === 'fill' ? color.background : color.primary};
    border: 1px solid ${color.primary};
    border-radius: 4px;
    font-size: ${({ size }) => size ? fontsize[size] : fontsize.s};
    font-weight: ${({ weight }) => weight ? fontweight[weight] : fontweight.b};
  `,
};
