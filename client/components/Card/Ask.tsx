import styled from "@emotion/styled";
import color from "@/client/color";
import Typography from "../Typography";
import { InAskClient } from "@/common/models/ask";
import convertDateToString from "@/common/utils/convert_date";

const Ask = ({ ask, replyedAt, reply, deny }: InAskClient) => {

  const render = () => {
    if (deny) {
      return <Typography size='s' weight='b'>{reply}</Typography>
    }
    if (!reply) {
      return (
        <>
          <Typography size='s' weight='b' >{ask}</Typography>
          <Typography 
          size='ex' 
          style={{ color: color.secondary }}
        >
          답변을 기다리는 질문입니다.
        </Typography>
        </>
      )
    }
    if (replyedAt) {
      return (
        <>
          <Typography size='s' weight='b' >{ask}</Typography>
          <div>
            <Typography 
              size='ex' 
              style={{ color: color.secondary }}
            >
              {convertDateToString(replyedAt)}
            </Typography>
            <S.Answer size='s'>{reply}</S.Answer>
          </div>
        </>
      )
    }
  };

  return (
    <S.AskItem>
      {render()}
    </S.AskItem>
  );
};

export default Ask;

const S = {
  AskItem: styled('li')`
    display: grid;
    border-radius: 16px;
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 20px 0;
    max-width: 400px;
    background-color: ${color.white};

    & * {
      padding: 0 20px;
    }

    & div {
      padding: 0;
    }
  `,
  Answer: styled(Typography)`
    margin: 0;
    border-left: 4px solid ${color.primary};
    padding-left: 16px;
    margin-top: 4px;
  `,
};
