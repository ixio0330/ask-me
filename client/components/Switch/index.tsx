import styled from "@emotion/styled";
import color from "@/client/color";

export interface SwitchProps {
  active: boolean;
  onClick?: () => void;
}

const Switch = (props: SwitchProps) => {
  return (
    <S.Switch 
      {...props}
    >
      <S.SwitchButton active={props.active} />
    </S.Switch>
  );
};

export default Switch;

const S = {
  Switch: styled('div')<SwitchProps>`
    position: relative;
    width: 36px;
    height: 20px;
    border-radius: 28px;
    padding: 2px;
    box-sizing: border-box;
    background-color: ${({ active }) => active ? color.primary : color.secondary};
  `,
  SwitchButton: styled('div')<SwitchProps>`
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: ${color.background};
    transition: 0.3s;
    transform: ${({ active }) => active ? 'translate(16px)' : 'none'};
  `,
};
