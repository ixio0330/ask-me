import { BadRequest, InternalServerError } from './../error/index';
import type { NextApiRequest, NextApiResponse } from 'next'
import UsersStorage from '@/server/storage/users';

type Data = {
  message?: string;
  data?: any;
}

export type Method = 'POST' | 'GET' | 'PUT' | 'DELETE';

const UsersController: Omit<any, Method> = {
  async POST(req: NextApiRequest) {
    const { 
      uid, 
      email, 
    } = req.body;
  
    if (uid === undefined || uid === null) {
      throw new BadRequest('uid가 누락되었습니다.');
    }
  
    if (email === undefined || email === null) {
      throw new BadRequest('email이 누락되었습니다.');
    }
  
    const addResult = await UsersStorage.add(req.body);
    if (!addResult.result) {
      throw new InternalServerError();
    }
    return addResult;
  },
};

export default UsersController;