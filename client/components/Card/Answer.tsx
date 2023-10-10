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
import { useState } from "react";
import AskApi from "@/client/api/ask";
import ReplyApi from "@/client/api/reply";

export interface AnswerProps extends InAskClient {
  onSendComplete?: () => void;
  onUpdateDenyComplete?: (askId: string, ask: InAskClient) => void;
}

const Answer = ({ uid, id, ask, deny, reply, replyedAt, onSendComplete, onUpdateDenyComplete }: AnswerProps) => {
  const [newReply, setNewReply] = useState('');
  const onClickPostReply = async () => {
    const postResult = await ReplyApi.post({ uid, askId: id, reply: newReply });
    if (!postResult?.result) {
      window.alert(postResult?.message);
      return;
    }
    setNewReply('');
    onSendComplete && onSendComplete();
  };

  const onUpdateDeny = async (uid: string, askId: string, deny: boolean) => {
    const fetchResult = await AskApi.putAskDeny(uid, askId, deny);
    if (!fetchResult.result || !fetchResult.data) {
      window.alert(fetchResult?.message);
      return;
    }
    onUpdateDenyComplete && onUpdateDenyComplete(fetchResult.data?.id, fetchResult.data);
  };

  const render = () => {
    // Deny
    if (deny) {
      return (
        <>
          <Typography className={C.paddingX20} size='s' weight='b'>{ask}</Typography>
          <Switch 
            label='공개' 
            className={C.paddingX20} 
            active={!deny}
            onClick={() => onUpdateDeny(uid, id, !deny)}  
          />
        </>
      );
    }

    // Pending
    if (!reply) {
      return (
        <>
          <Typography className={C.paddingX20} size='s' weight='b'>{ask}</Typography>
          <div className={C.paddingX20}>
            <Input 
              value={newReply}
              onChange={(e) => setNewReply(e.target.value)}
              placeholder='답변을 입력해주세요' 
            />
          </div>
          <S.AnswerActions className={C.paddingX20}>
            <Switch 
              label='공개' 
              active={!deny} 
              onClick={() => onUpdateDeny(uid, id, !deny)} 
            />
            <Button onClick={onClickPostReply}>등록</Button>
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
          <S.AnswerActions className={C.paddingX20}>
            <Switch 
              label='공개' 
              active={!deny} 
              onClick={() => onUpdateDeny(uid, id, !deny)} 
            />
            <Button>답변 수정</Button>
          </S.AnswerActions>
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
