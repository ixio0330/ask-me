import { CustomError } from './../../server/error/index';
import { AddReply } from './../../common/models/reply';
import axios from 'axios';

type Response = {
  result: boolean;
  message?: string;
  data?: [];
}

const ReplyApi = {
  async post({uid, askId, reply}: AddReply) {
    if (reply.length <= 0 || 2000 < reply.length) return;
    try {
      await axios.post('/api/reply', {
        uid,
        askId,
        reply,
      });
      return {
        result: true,
      } as Response;
    } catch (error) {
      return (
        error instanceof CustomError ? 
        {
          return: false,
          message: error.message,
        } : 
        {
          result: false,
          message: '답변 등록에 실패했습니다.'
        }
      ) as Response;
    }
  }
};

export default ReplyApi;