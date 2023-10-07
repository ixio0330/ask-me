import styled from "@emotion/styled";
import { ComponentProps } from "react";
import color from "@/client/color";

export interface InputProps extends ComponentProps<'input'> {}

const Input = (props: InputProps) => {
  return <S.Input {...props} />
};

export default Input;

const S = {
  Input: styled('input')`
    display: flex;
    width: 100%;
    height: 48px;
    box-sizing: border-box;
    padding: 12px 16px;
    align-items: center;
    border-radius: 16px;
    border: none;
    background-color: ${color.background};
    outline: 1px solid ${color.background};

    ::placeholder {
      color: ${color.secondary};
    }

    &:focus {
      outline-color: ${color.primary};
    }
  `
};
