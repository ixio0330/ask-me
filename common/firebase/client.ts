import { Auth, getAuth } from 'firebase/auth';
import { getApps, initializeApp } from 'firebase/app';

class FirebaseClient {
  private auth: Auth;
  constructor() {
    const apps = getApps();
    if (apps.length === 0) {
      // App 초기화
      initializeApp({
        apiKey: process.env.NEXT_PUBLIC_PUBLIC_API_KEY || '',
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_HOST || '',
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID || '',
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