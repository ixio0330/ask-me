import firebaseAdmin from '@/common/firebase/admin';
import { InAuthUser } from '@/common/models/in_auth_user';
export const USER_COL = 'users';
export const SCREEN_NAME_COL = 'screen_names';

interface AddResponse {
  result: boolean;
  data?: any;
  message?: string;
}

const UsersStorage = {
  async add({uid, email, displayName, photoURL}: InAuthUser): Promise<AddResponse> {
    try {
      const addResult = await firebaseAdmin.Firebase.runTransaction(async (transection) => {
        const userRef = firebaseAdmin
          .Firebase
          .collection(USER_COL)
          .doc(uid);
        const screenNameRef = firebaseAdmin
          .Firebase
          .collection(SCREEN_NAME_COL)
          .doc((email as string).replace('@gmail.com', ''));
        const userDoc = await transection.get(userRef);
        if (userDoc.exists) {
          return false;
        }
        const addData = {
          uid,
          email,
          displayName: displayName ?? '',
          photoURL: photoURL ?? '',
        };
        await transection.set(userRef, addData);
        await transection.set(screenNameRef, addData);
        return true;
      });
      if (!addResult) {
        return { result: true, data: uid };
      }
      return { result: true, data: uid };
    } catch (error) {
      console.log(error);
      return { result: false, message: '사용자 등록에 실패했습니다.'}
    }
  },
  async getByScreenName(screenName: string): Promise<InAuthUser | null> {
    const userRef = firebaseAdmin.Firebase.collection(SCREEN_NAME_COL).doc(screenName);
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      return null;
    }
    return userDoc.data() as InAuthUser;
  }
}

export default UsersStorage;