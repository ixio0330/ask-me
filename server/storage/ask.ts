import { InAskClient } from './../../common/models/ask';
import { BadRequest } from './../error/index';
import firebaseAdmin from '@/common/firebase/admin';
import { USER_COL } from "./users";
import { firestore } from 'firebase-admin';
import { query, orderBy, startAt, limit, collection } from 'firebase/firestore';
import { AddAsk, AskStatus, InAskServer } from '@/common/models/ask';
export const ASK_COL = 'ask';

const AskStorage = {
  async add({ uid, ask, author }: AddAsk) {
    const userRef = firebaseAdmin.Firebase.collection(USER_COL).doc(uid);
    return await firebaseAdmin.Firebase.runTransaction(async (transection) => {
      try {
        const userDoc = await transection.get(userRef);
        if (!userDoc.exists) {
          throw new BadRequest('존재하지 않는 사용자입니다.');
        }
        const newAskRef = userRef.collection(ASK_COL).doc();
        const newAskBody = {
          ask,
          createdAt: firestore.FieldValue.serverTimestamp(),
          reply: null,
          status: 'public' as AskStatus,
          author: author ?? null,
        }
        await transection.set(newAskRef, newAskBody);
        return { result: true, data: newAskBody };
      } catch (error) {
        return { result: false, message: '질문 등록에 실패했습니다.'};
      }
    });
  },
  async getAll({ uid, offset = '0', limit = '10' }: { uid: string; offset: string | undefined; limit: string | undefined; }) {
    const userRef = firebaseAdmin.Firebase.collection(USER_COL).doc(uid);
    return await firebaseAdmin.Firebase.runTransaction(async (transection) => {
      try {
        const userDoc = await transection.get(userRef);
        if (!userDoc.exists) {
          throw new BadRequest('존재하지 않는 사용자입니다.');
        }
        const askCol = userRef.collection(ASK_COL).orderBy('createdAt', 'desc');
        const askColDoc = await transection.get(askCol);
        const paginationDoc = askColDoc.docs.slice(parseInt(offset), parseInt(limit) + parseInt(offset));
        const data = paginationDoc.map((mv) => {
          const docData = mv.data() as Omit<InAskServer, 'id'>;
          const returnData = {
            ...docData,
            id: mv.id,
            createdAt: docData.createdAt.toDate().toISOString(),
            replyedAt: docData.replyedAt? docData.replyedAt.toDate().toISOString() : undefined,
          } as InAskClient;
          return returnData;
        });
        return { result: true, data };
      } catch (error) {
        return { result: false, message: '질문 조회에 실패했습니다.'};
      }
    });
  },
  async getById({ uid, askId }: { uid: string, askId: string }) {
    const userRef = firebaseAdmin.Firebase.collection(USER_COL).doc(uid);
    const askRef = firebaseAdmin.Firebase.collection(USER_COL).doc(uid).collection(ASK_COL).doc(askId);
    return await firebaseAdmin.Firebase.runTransaction(async (transection) => {
      try {
        const userDoc = await transection.get(userRef);
        const askDoc = await transection.get(askRef);
  
        if (!userDoc.exists) {
          throw new BadRequest('존재하지 않는 사용자입니다.');
        }
  
        if (!askDoc.exists) {
          throw new BadRequest('존재하지 않는 질문입니다.');
        }
  
        const askData = askDoc.data() as InAskServer;
        return { 
          result: true, 
          data: {
            ...askData,
            id: askId,
            createdAt: askData.createdAt.toDate().toISOString(),
            replyedAt: askData.replyedAt? askData.replyedAt.toDate().toISOString() : undefined,
          }
        };
      } catch (error) {
        return { result: false, message: '질문을 조회하던 중 오류가 발생했습니다.'}
      }
    });
  }
};

export default AskStorage;