import styled from "@emotion/styled";
import color from "@/client/color";
import Input from "../Input";
import Button from "../Button";
import Typography from "../Typography";
import { InAuthUser } from "@/common/models/in_auth_user";
import Image from 'next/image'
import { ComponentProps, useState } from "react";
import AskApi from "@/client/api/ask";

export type BioStatus = 'visitor' | 'owner' | 'update';

export interface BioProps extends InAuthUser, ComponentProps<'input'> {
  status?: BioStatus;
  bio: string;
  onSendComplete?: () => void;
  onClickUpdateBio?: () => void;
  onClickSaveBio?: () => void;
  onClickCancel?: () => void;
}

const Bio = (
  { 
    status = 'visitor', 
    bio,
    photoURL, 
    uid,
    displayName, 
    value, 
    placeholder, 
    onChange, 
    onSendComplete,
    onClickUpdateBio,
    onClickSaveBio,
    onClickCancel,
  }: BioProps
) => {
  const [ask, setAsk] = useState('');
  const onClickSend = async () => {
    const res = await AskApi.post({ 
      uid: uid as string, 
      ask, 
      author: null,
    });
    if (!res?.result) {
      console.log(res);
      return;
    }
    setAsk('');
    onSendComplete && onSendComplete();
  };

  const render = () => {
    switch (status) {
      case 'visitor':
        return (
          <>
            <Typography>{bio}</Typography>
            <Input 
              placeholder={placeholder ?? '무엇이 궁금한가요?'}
              value={ask}
              onChange={(e) => setAsk(e.target.value)} 
            />
            <Button 
              onClick={onClickSend}
              style={{ width: 'auto', justifySelf: 'end' }}
            >
              등록
            </Button>
          </>
        );
      case 'owner':
        return (
          <>
            <Typography style={{ height: 48, lineHeight: '48px' }}>{bio}</Typography>
            <Button 
              onClick={onClickUpdateBio}
              style={{ width: 'auto', justifySelf: 'end' }}
            >
              소개 수정
            </Button>
          </>
        )
      case 'update':
        return (
          <>
            <Input 
              placeholder={placeholder ?? '소개를 입력해주세요'}
              value={value}
              onChange={onChange}
            />
            <S.BioUpdateActions>
              <Button 
                variant='outlined'
                onClick={onClickCancel}
              >
                취소
              </Button>
              <Button onClick={onClickSaveBio}>
                소개 저장
              </Button>
            </S.BioUpdateActions>
          </>
        );
    }
  };

  return (
    <S.Bio>
      <S.UserProfile>
        <S.UserProfileImage 
          src={photoURL ?? ''} 
          width={48} 
          height={48} 
          alt={`${displayName} 프로필 이미지`} 
        />
        <Typography weight='b'>{displayName}</Typography>
      </S.UserProfile>
      {render()}
    </S.Bio>
  )
};

export default Bio;

const S = {
  Bio: styled('div')`
    display: grid;
    border-radius: 16px;
    grid-template-columns: 1fr;
    gap: 20px;
    background-color: ${color.white};
    max-width: 400px;
    padding: 20px;
    box-sizing: border-box;
  `,
  UserProfileImage: styled(Image)`
    margin-right: 12px;
    border-radius: 50%;
  `,
  UserProfile: styled('div')`
    display: flex;
    align-items: center;
  `,
  BioUpdateActions: styled('div')`
    justify-self: end;

    & button {
      margin-left: 12px;
    }
  `,
};
