import { ComponentProps } from "react";
import styled from "@emotion/styled";

export interface TypographyProps extends ComponentProps<'p'> {
  size?: keyof typeof fontsize;
  weight?: keyof typeof fontweight;
}

const Typography = ({ children, size = 'm', weight = 'm', ...props }: TypographyProps) => {
  return (
    <S.Typography 
      size={size} 
      weight={weight}
      {...props} 
    >
      {children}
    </S.Typography>
  )
};

export default Typography;

const S = {
  Typography: styled('p')<TypographyProps>`
    margin: 0;
    font-size: ${({ size }) => size ? fontsize[size] : fontsize.m};
    font-weight: ${({ weight }) => weight ? fontweight[weight] : fontweight.m};
  `,
};

// 사이즈
export const fontsize = {
  l: '20px',
  m: '16px',
  s: '14px',
  ex: '12px',
};

// 굵기
export const fontweight= {
  l: 'light', //300
  r: 'regular', // 400
  m: 'medium', // 500
  sb: 'semi-bold', // 600
  b: 'bold', // 700
};
