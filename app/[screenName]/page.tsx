import { use } from "react";
import { InAuthUser } from "@/common/models/in_auth_user";
import NotFoundPage from "../not-found";
import UserHomePage from "@/client/components/user_home";
import axios from 'axios';

export default function UserHomeContainer({ params }: { params: { screenName: string } }) {
  const userInfo = use(getUserInfo(params.screenName));
  
  if (userInfo === null) {
    return <NotFoundPage />
  }
  
  return <UserHomePage userInfo={userInfo}/>
};

async function getUserInfo(screenName: string) {
  if (screenName === undefined) {
    return null;
  }

  try {
    const protocol = process.env.PROTOCOL || 'http';
    const host = process.env.HOST || 'localhost';
    const port = process.env.PORT || 3000;
    const baseUrl = `${protocol}://${host}:${port}`;
    const userInfo = await axios.get(`${baseUrl}/api/user/${screenName}`);
    return userInfo.data as InAuthUser ?? null;
  } catch (error) {
    return null;
  }
}
