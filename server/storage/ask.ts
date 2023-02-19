import { InAskClient } from './../../common/models/ask';
import { BadRequest } from './../error/index';
import firebaseAdmin from '@/common/firebase/admin';
import { USER_COL, SCREEN_NAME_COL } from "./users";
import { firestore } from 'firebase-admin';
import { AddAsk, AskStatus, InAskServer } from '@/common/models/ask';
const ASK_COL = 'ask';

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
          replys: null,
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
  async getAll({ uid }: { uid: string }) {
    const userRef = firebaseAdmin.Firebase.collection(USER_COL).doc(uid);
    return await firebaseAdmin.Firebase.runTransaction(async (transection) => {
      try {
        const userDoc = await transection.get(userRef);
        if (!userDoc.exists) {
          throw new BadRequest('존재하지 않는 사용자입니다.');
        }
        const askCol = userRef.collection(ASK_COL);
        const askColDoc = await transection.get(askCol);
        const data = askColDoc.docs.map((mv) => {
          const docData = mv.data() as Omit<InAskServer, 'id'>;
          const returnData = {
            ...docData,
            id: mv.id,
            createdAt: docData.createdAt.toDate().toISOString(),
            replyedAt: docData.replyedAt? docData.replyedAt.toDate().toDateString() : undefined,
          } as InAskClient;
          return returnData;
        });
        return data;
      } catch (error) {
        return { result: false, message: '질문 조회에 실패했습니다.'};
      }
    });
  }
};

export default AskStorage;