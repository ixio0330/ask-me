import { Auth, getAuth } from 'firebase/auth';
import { getApps, initializeApp } from 'firebase/app';
import getConfig from 'next/config';


class FirebaseClient {
  private auth: Auth;
  constructor() {
    const apps = getApps();
    if (apps.length === 0) {
      // 환경변수 가져오기
      const { publicRuntimeConfig } = getConfig();
      
      // App 초기화
      initializeApp({
        apiKey: publicRuntimeConfig.apiKey,
        authDomain: publicRuntimeConfig.authDomain,
        projectId: publicRuntimeConfig.projectId,
      });
    }
    this.auth = getAuth();
  }

  public get Auth(): Auth {
    return this.auth;
  }
}

const firebaseClient = new FirebaseClient();
export default firebaseClient;