import { BadRequest, InternalServerError } from './../error/index';
import type { NextApiRequest } from 'next';
import ReplyStorage from '../storage/reply';

export type Method = 'POST' | 'GET' | 'PUT' | 'DELETE';

const ReplyController: Omit<any, Method> = {
  async POST(req: NextApiRequest) {
    const { 
      uid, 
      askId, 
      reply
    } = req.body;
  
    if (uid === undefined || uid === null) {
      throw new BadRequest('uid가 누락되었습니다.');
    }
  
    if (askId === undefined || askId === null) {
      throw new BadRequest('askId가 누락되었습니다.');
    }

    if (reply === undefined || reply === null || reply === '') {
      throw new BadRequest('reply가 누락되었습니다.');
    }
  
    const replyResult = await ReplyStorage.add(req.body);
    if (!replyResult.result) {
      throw new InternalServerError(replyResult.message);
    }
    return replyResult.data;
  },
};

export default ReplyController;