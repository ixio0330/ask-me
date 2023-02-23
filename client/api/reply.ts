import { AddReply } from './../../common/models/reply';
import axios, { AxiosError } from 'axios';

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
        error instanceof AxiosError ? 
        {
          return: false,
          message: error.response?.data.message,
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