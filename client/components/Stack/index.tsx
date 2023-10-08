import styled from "@emotion/styled";
import { ComponentProps } from "react";

export interface StackProps extends ComponentProps<'div'> {
  gap?: number;
}

const Stack = ({ gap = 20, children, ...props }: StackProps) => {
  return (
    <S.Stack {...props}>
      {children}
    </S.Stack>
  )
};

export default Stack;

const S = {
  Stack: styled('div')<StackProps>`
    display: grid;
    grid-template-columns: 1fr;
    gap: ${({ gap }) => gap ?? 20}px;
  `,
};
