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
        const usersDoc = await transection.get(userRef);
        if (usersDoc.exists) {
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
      return { result: false, message: '서버 에러'}
    }
  }
}

export default UsersStorage;