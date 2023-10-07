import styled from "@emotion/styled";
import { ComponentProps } from "react";
import color from "@/client/color";
import Input from "../Input";
import Button from "../Button";

const Bio = () => {
  return (
    <S.Bio>
      <S.UserProfile>
        <S.UserProfileImage />
        서나무
      </S.UserProfile>
      <p>안녕하세요, 서나무입니다.</p>
      <Input placeholder='무엇이 궁금한가요?' />
      <Button>등록</Button>
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
  UserProfileImage: styled('img')`
    margin-right: 12px;
  `,
  UserProfile: styled('div')`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};

// https://lh3.googleusercontent.com/a/AEdFTp4B9If0zw6ex3tT7TYldHLlMV5Y5QIKnRhcrJiv=s96-c
