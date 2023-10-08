import styled from "@emotion/styled";
import { css } from "@emotion/css";
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
    // Deny
    if (deny) {
      return (
        <>
          <Typography className={C.paddingX20} size='s' weight='b'>{reply}</Typography>
          <Switch className={C.paddingX20} label='공개' active={!deny} />
        </>
      );
    }

    // Pending
    if (!reply) {
      return (
        <>
          <Typography className={C.paddingX20} size='s' weight='b'>{ask}</Typography>
          <div className={C.paddingX20}>
            <Input placeholder='답변을 입력해주세요' />
          </div>
          <S.AnswerActions className={C.paddingX20}>
            <Switch label='공개' active={!deny} />
            <Button>등록</Button>
          </S.AnswerActions>
        </>
      )
    }

    if (replyedAt) {
      return (
        <>
          <Typography className={C.paddingX20} size='s' weight='b' >{ask}</Typography>
          <div>
            <Typography 
              className={C.paddingX20}
              size='ex' 
              style={{ color: color.secondary }}
            >
              {convertDateToString(replyedAt)}
            </Typography>
            <Reply className={C.paddingX20}>{reply}</Reply>
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
    box-sizing: border-box;
  `,
  AnswerActions: styled('div')`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
};

const C = {
  paddingX20: css`
    padding: 0 20px;
  `,
};
