import styled from "@emotion/styled";
import color from "@/client/color";
import Typography, { TypographyProps } from ".";

const Reply = ({ children }: TypographyProps) => {
  return <S.Reply size='s'>{children}</S.Reply>
};

export default Reply;

const S = {
  Reply: styled(Typography)`
    margin: 0;
    border-left: 4px solid ${color.primary};
    padding: 0 20px 0 16px;
    margin-top: 4px;
  `,
};
