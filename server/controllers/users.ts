import { BadRequest, InternalServerError, NotFound } from './../error/index';
import type { NextApiRequest } from 'next'
import UsersStorage from '@/server/storage/users';

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
      throw new InternalServerError(addResult.message);
    }
    return addResult;
  },
  async GET(req: NextApiRequest) {
    const { screenName } = req.query;

    if (screenName === undefined || screenName === null) {
      throw new BadRequest('screenName이 누락되었습니다.');
    }

    const findResult = await UsersStorage.getByScreenName(Array.isArray(screenName) ? screenName[0] : screenName);
    if (!findResult) {
      throw new NotFound('존재하지 않는 사용자입니다.');
    }
    return findResult;
  }
};

export default UsersController;