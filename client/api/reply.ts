import { AddReply } from '@/common/models/reply';
import axios, { Response } from './axios';
import { InAskClient } from '@/common/models/ask';

const ReplyApi = {
  async post({uid, askId, reply}: AddReply) {
    if (reply.length <= 0 || 2000 < reply.length) return;
    try {
      const res = await axios.post('reply', {
        uid,
        askId,
        reply,
      });
      return res.data as Response<InAskClient>;
    } catch (error) {
      return error as Response<InAskClient>;
    }
  }
};

export default ReplyApi;