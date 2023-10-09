import { use } from "react";
import { InAuthUser } from "@/common/models/in_auth_user";
import NotFoundPage from "../not-found";
import UserHome from "@/client/components/User/Home";
import axios from 'axios';
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { screenName: string } }): Promise<Metadata> {
  const userInfo = await getUserInfo(params.screenName);
 
  return {
    title: userInfo ? `${userInfo?.displayName}의 질문함` : 'Ask Me',
    description: 'Ask Me는 익명 질문 사이트입니다.',
    authors: [{ 
      name: '서나무',
      url: 'https://github.com/ixio0330/ask-me',
    }],
  }
}

const UserHomePage = ({ params }: { params: { screenName: string } }) => {
  const userInfo = use(getUserInfo(params.screenName));
  
  if (userInfo === null) {
    return <NotFoundPage />
  }
  
  return <UserHome userInfo={userInfo}/>
};

async function getUserInfo(screenName: string) {
  if (screenName === undefined) {
    return null;
  }

  try {
    const protocol = process.env.NEXT_PUBLIC_PROTOCOL || 'http';
    const host = process.env.NEXT_PUBLIC_HOST || 'localhost';
    const port = process.env.NEXT_PUBLIC_PORT || 3000;
    const baseUrl = `${protocol}://${host}:${port}`;
    const userInfo = await axios.get(`${baseUrl}/api/user/${screenName}`);
    return userInfo.data as InAuthUser ?? null;
  } catch (error) {
    return null;
  }
};

export default UserHomePage;
