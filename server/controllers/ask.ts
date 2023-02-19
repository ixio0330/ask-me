import { BadRequest, InternalServerError } from './../error/index';
import type { NextApiRequest } from 'next';
import AskStorage from '../storage/ask';

export type Method = 'POST' | 'GET' | 'PUT' | 'DELETE';

const AskController: Omit<any, Method> = {
  async POST(req: NextApiRequest) {
    const { 
      uid, 
      ask,
      author 
    } = req.body;
  
    if (uid === undefined || uid === null) {
      throw new BadRequest('uid가 누락되었습니다.');
    }
  
    if (ask === undefined || ask === null) {
      throw new BadRequest('ask가 누락되었습니다.');
    }
  
    const addResult = await AskStorage.add(req.body);
    if (!addResult.result) {
      throw new InternalServerError(addResult.message);
    }
    return addResult;
  },
  async GET(req: NextApiRequest) {
    const { uid } = req.query;

    if (uid === undefined || uid === null) {
      throw new BadRequest('uid가 누락되었습니다.');
    }

    const uidToStr = Array.isArray(uid) ? uid[0] : uid;
    return await AskStorage.getAll({ uid: uidToStr });
  }
};

export default AskController;