import styled from "@emotion/styled"
import color from "@/client/color";
import { InAskClient } from "@/common/models/ask";
import convertDateToString from "@/common/utils/convert_date";
import Typography from "../Typography";
import Switch from "../Switch";
import Input from "../Input";
import Button from "../Button";
import Reply from "../Typography/Reply";

const Answer = ({ ask, deny, reply, replyedAt }: InAskClient) => {
  const render = () => {
    if (deny) {
      return (
        <>
          <Typography size='s' weight='b'>{reply}</Typography>
          <Switch label='공개' active={!deny} />
        </>
      );
    }

    if (!reply) {
      return (
        <>
          <Typography size='s' weight='b' className={C.paddingX}>{ask}</Typography>
          <Input placeholder='답변을 입력해주세요' />
          <S.AnswerActions>
            <Switch label='공개' active={!deny} />
            <Button>등록</Button>
          </S.AnswerActions>
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
            <Reply>{reply}</Reply>
          </div>
        </>
      )
    }
  };

  return (
    <S.Answer>
      {render()}
    </S.Answer>
  )
};

export default Answer;

const S = {
  Answer: styled('li')`
    display: grid;
    border-radius: 16px;
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 20px 0;
    max-width: 400px;
    background-color: ${color.white};
    border: 1px solid #000;
    box-sizing: border-box;
  `,
  AnswerActions: styled('div')`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
};
