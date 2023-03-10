import firebaseClient from '@/common/firebase/client';
import { InAskClient } from './../../common/models/ask';
import { AddAsk } from "@/common/models/ask";
import axios, { AxiosError } from 'axios';

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
      return (error instanceof AxiosError ?
        {
          return: false,
          message: error.response?.data.message,
        } : 
        {
          result: false,
          message: '질문 등록에 실패했습니다.'
        }
      ) as Response<InAskClient[]>;
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
      return (error instanceof AxiosError ?
        {
          return: false,
          message: error.response?.data.message,
        } :
        {
          result: false,
          message: '질문 조회에 실패했습니다.',
        }
      ) as Response<InAskClient[]>;
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
      return (error instanceof AxiosError ?
        {
          return: false,
          message: error.response?.data.message,
        } :
        {
          result: false,
          message: '질문 조회에 실패했습니다.',
        }
      ) as Response<InAskClient>;
    }
  },
  async putAskDeny(uid: string, askId: string, deny: boolean) {
    const token = await firebaseClient.Auth.currentUser?.getIdToken();
    if (token === undefined) {
      throw new Error('');
    }
    try {
      const res = await axios.put('/api/ask', 
        {
          uid,
          askId,
          deny,
        },
        {
          headers: {
            Authorization: token,
          }
        }
      );
      return {
        result: true,
        data: res.data,
      } as Response<InAskClient>
    } catch (error) {
      return (error instanceof AxiosError ?
        {
          return: false,
          message: error.response?.data.message,
        } : 
        {
          result: false,
          message: '질문 상태 변경 중 오류가 발생했습니다.',
        }
      ) as Response<InAskClient>;
    }
  }
};

export default AskApi;