import { AddAsk } from "@/common/models/ask";
import axios from 'axios';

type Response = {
  result: boolean;
  message?: string;
}

const AskApi = {
  async post({ uid, ask, author }: AddAsk) {
    if (ask.length <= 0 || 2000 < ask.length) return;
    try {
      await axios.post('/api/ask', {
        uid,
        ask,
        author,
      });
      return {
        result: true,
      } as Response;
    } catch (error) {
      console.log(error);
      return {
        result: false,
        message: '질문 등록에 실패했습니다.'
      } as Response;
    }
  }
};

export default AskApi;