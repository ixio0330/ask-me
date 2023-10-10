import firebaseClient from '@/common/firebase/client';
import { AddAsk, InAskClient } from "@/common/models/ask";
import axios, { Response } from './axios';

const AskApi = {
  async post({ uid, ask, author }: AddAsk) {
    if (ask.length <= 0 || 2000 < ask.length) return;
    try {
      const res = await axios.post('ask', {
        uid,
        ask,
        author,
      });
      return res.data as Response<InAskClient>;
    } catch (error: unknown) {
      return error as Response<InAskClient>;
    }
  },
  async getAll(uid: string, offset: number) {
    try {
      const token = await firebaseClient.Auth.currentUser?.getIdToken();
      const res = await axios.get(`ask?uid=${uid}&offset=${offset}`, {
        headers: {
          Authorization: token,
        }
      });
      return res.data as Response<InAskClient[]>;
    } catch (error) {
      return error as Response<InAskClient[]>;
    }
  },
  async getById(uid: string, askId: string) {
    try {
      const token = await firebaseClient.Auth.currentUser?.getIdToken();
      const res = await axios.get(`ask?uid=${uid}&askId=${askId}`, {
        headers: {
          Authorization: token,
        }
      });
      return res.data as Response<InAskClient>;
    } catch (error) {
      return error as Response<InAskClient>;
    }
  },
  async putAskDeny(uid: string, askId: string, deny: boolean) {
    try {
      const token = await firebaseClient.Auth.currentUser?.getIdToken();
      if (token === undefined) {
        throw new Error('');
      }
      const res = await axios.put('ask', {
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
      return res.data as Response<InAskClient>;
    } catch (error) {
      return error as Response<InAskClient>;
    }
  },
};

export default AskApi;