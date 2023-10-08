import styled from "@emotion/styled";
import { css } from "@emotion/css";
import color from "@/client/color";
import Typography from "../Typography";
import { InAskClient } from "@/common/models/ask";
import convertDateToString from "@/common/utils/convert_date";
import Reply from "../Typography/Reply";

const Ask = ({ ask, replyedAt, reply, deny }: InAskClient) => {

  const render = () => {
    // Deny
    if (deny) {
      return <Typography className={C.paddingX20} size='s' weight='b'>{ask}</Typography>
    }

    // Pending
    if (!reply) {
      return (
        <>
          <Typography className={C.paddingX20} size='s' weight='b' >{ask}</Typography>
          <Typography 
          className={C.paddingX20}
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
    <S.Ask>
      {render()}
    </S.Ask>
  );
};

export default Ask;

const S = {
  Ask: styled('li')`
    display: grid;
    border-radius: 16px;
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 20px 0;
    max-width: 400px;
    background-color: ${color.white};
  `,
};

const C = {
  paddingX20: css`
    padding: 0 20px;
  `,
};
