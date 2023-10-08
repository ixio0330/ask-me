import styled from "@emotion/styled";
import color from "@/client/color";
import Typography from "../Typography";

export interface SwitchProps {
  active: boolean;
  onClick?: () => void;
  label?: string;
  className?: string;
}

const Switch = ({ active, label, onClick, className }: SwitchProps) => {
  return (
    <S.SwitchContainer onClick={onClick} className={className}>
      {
        label && 
          <Typography 
            size='ex' 
            style={{ marginRight: 8 }}
          >
            {label}
          </Typography>
      }
      <S.Switch active={active}>
        <S.SwitchButton active={active} />
      </S.Switch>
    </S.SwitchContainer>
  );
};

export default Switch;

const S = {
  SwitchContainer: styled('div')`
    display: flex;
    align-items: center;
  `,
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
