import styled from "@emotion/styled";
import color from "@/client/color";
import Input from "../Input";
import Button from "../Button";
import Typography from "../Typography";
import { InAuthUser } from "@/common/models/in_auth_user";
import Image from 'next/image'
import { ComponentProps } from "react";

export type BioStatus = 'visitor' | 'owner' | 'update';

export interface BioProps extends Pick<InAuthUser, 'displayName' | 'photoURL'>, ComponentProps<'input'> {
  status?: BioStatus;
  bio: string;
  onClickSend?: () => void;
  onClickUpdateBio?: () => void;
  onClickSaveBio?: () => void;
  onClickCancel?: () => void;
}

const Bio = (
  { 
    status = 'visitor', 
    bio,
    photoURL, 
    displayName, 
    value, 
    placeholder, 
    onChange, 
    onClickSend,
    onClickUpdateBio,
    onClickSaveBio,
    onClickCancel,
  }: BioProps
) => {

  const render = () => {
    switch (status) {
      case 'visitor':
        return (
          <>
            <Typography>{bio}</Typography>
            <Input 
              placeholder={placeholder ?? '무엇이 궁금한가요?'}
              value={value}
              onChange={onChange} 
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
            <Typography style={{ height: 46, lineHeight: '46px' }}>{bio}</Typography>
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
          width={60} 
          height={60} 
          alt={`${displayName} 프로필 이미지`} 
        />
        <Typography size='l' weight='b'>{displayName}</Typography>
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
    border: 1px solid #ddd;
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
