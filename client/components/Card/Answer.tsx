import styled from "@emotion/styled";
import color from "@/client/color";
import Typography from "../Typography";
import { InAskClient } from "@/common/models/ask";
import Switch from "../Switch";
import Input from "../Input";
import Button from "../Button";

const Answer = ({ deny, reply }: InAskClient) => {
  const render = () => {
    if (deny) {
      return (
        <>
          <Typography size='s' weight='b'>{reply}</Typography>
          <span>공개</span>
          <Switch active={!deny} />
        </>
      );
    }
    if (!reply) {
      return (
        <>
          <Typography size='s' weight='b'>{reply}</Typography>
          <Input placeholder='답변을 입력해주세요' />
          <div>
            <div>
              <span>공개</span>
              <Switch active={!deny} />
            </div>
            <Button>등록</Button>
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

    & * {
      padding: 0 20px;
    }
  `,
};
