import firebaseAdmin from '@/common/firebase/admin';
import { InAuthUser } from '@/common/models/in_auth_user';
export const USER_COL = 'users';
export const SCREEN_NAME_COL = 'screen_names';

interface AddResponse {
  success: boolean;
  data?: any;
  message?: string;
}

const UsersStorage = {
  // * 사용자 등록
  async add({ uid = '', email = '', displayName = '', photoURL = '' }: InAuthUser): Promise<AddResponse> {
    // 신규가입 불가
    const checkUserExist = await firebaseAdmin.Firebase.collection(USER_COL).doc(uid).get();
    if (checkUserExist.exists) {
      return { success: true, data: uid };
    }
    return { success: false, message: '현재는 신규 가입을 할 수 없습니다' };

    try {
      const addsuccess = await firebaseAdmin.Firebase.runTransaction(async (transection) => {
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
      if (!addsuccess) {
        return { success: true, data: uid };
      }
      return { success: true, data: uid };
    } catch (error) {
      return { success: false, message: '사용자 등록에 실패했습니다' }
    }
  },
  // * 사용자 ScreenName으로 조회
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