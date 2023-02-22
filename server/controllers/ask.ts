import firebaseAdmin from '@/common/firebase/admin';
import { BadRequest, InternalServerError, NotValidToken } from './../error/index';
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
    const { uid, askId, offset, limit } = req.query;

    if (uid === undefined || uid === null) {
      throw new BadRequest('uid가 누락되었습니다.');
    }

    const uidToStr = Array.isArray(uid) ? uid[0] : uid;
    const getResult = askId ? 
      await AskStorage.getById({ uid: uidToStr, askId: askId as string }) : 
      await AskStorage.getAll({ 
        uid: uidToStr, 
        offset: Array.isArray(offset) ? offset[0] : offset, 
        limit: Array.isArray(limit) ? limit[0] : limit, 
      });
    
    if (!getResult.result) {
      throw new InternalServerError(getResult.message);
    }
    return getResult.data;
  },
  async PUT(req: NextApiRequest) {
    const token = req.headers.authorization;
    if (token === undefined) {
      throw new NotValidToken('권한이 없습니다.');
    }

    let tokenUid: null | string = null;
    try {
      const decode = await firebaseAdmin.Auth.verifyIdToken(token);
      tokenUid = decode.uid;
    } catch (error) {
      throw new NotValidToken();
    }

    const { uid, askId, deny } = req.body;
    if (uid !== tokenUid) {
      throw new BadRequest('수정 권한이 없습니다.');
    }

    if (uid === undefined || uid === null) {
      throw new BadRequest('uid가 누락되었습니다.');
    }
  
    if (askId === undefined || askId === null) {
      throw new BadRequest('askId가 누락되었습니다.');
    }

    if (deny === undefined || deny === null) {
      throw new BadRequest('deny가 누락되었습니다.');
    }

    const addResult = await AskStorage.updateAskStatus(req.body);
    if (!addResult.result) {
      throw new InternalServerError(addResult.message);
    }
    return addResult.data;
  }
};

export default AskController;