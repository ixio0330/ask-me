import { InAskClient } from './../../common/models/ask';
import { AddAsk } from "@/common/models/ask";
import axios from 'axios';

type Response<T> = {
  result: boolean;
  message?: string;
  data?: T;
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
      } as Response<InAskClient[]>;
    } catch (error) {
      return {
        result: false,
        message: '질문 등록에 실패했습니다.'
      } as Response<InAskClient[]>;
    }
  },
  async getAll(uid: string, offset: number) {
    try {
      const res = await axios.get(`/api/ask?uid=${uid}&offset=${offset}`);
      return {
        result: true,
        data: res.data,
      } as Response<InAskClient[]>;
    } catch (error) {
      return {
        result: false,
        message: '질문 조회에 실패했습니다.',
      } as Response<InAskClient[]>;
    }
  },
  async getById(uid: string, askId: string) {
    try {
      const res = await axios.get(`/api/ask?uid=${uid}&askId=${askId}`);
      return {
        result: true,
        data: res.data,
      } as Response<InAskClient>;
    } catch (error) {
      return {
        result: false,
        message: '질문 조회에 실패했습니다.',
      } as Response<InAskClient>;
    }
  }
};

export default AskApi;