import { firestore } from 'firebase-admin';
import { InAskServer } from './../../common/models/ask';
import { BadRequest } from './../error/index';
import { ASK_COL } from './ask';
import { USER_COL } from './users';
import firebaseAdmin from '@/common/firebase/admin';
import { AddReply } from '@/common/models/reply';

const ReplyStorage = {
  async add({ uid, askId, reply }: AddReply) {
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
        if (askData.reply) {
          throw new BadRequest('이미 답변을 작성한 질문입니다.');
        }
        await transection.update(askRef, { reply, replyedAt: firestore.FieldValue.serverTimestamp() });
        return { result: true, data: askData };  
      } catch (error) {
        return { result: false, message: '답변을 등록하던 중 오류가 발생했습니다.'}
      }
    });
  },
};

export default ReplyStorage;