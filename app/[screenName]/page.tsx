import { use } from "react";
import { InAuthUser } from "@/common/models/in_auth_user";
import NotFoundPage from "../not-found";
import UserHome from "@/client/components/User/Home";
import axios from 'axios';

export default function UserHomeContainer({ params }: { params: { screenName: string } }) {
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
}
