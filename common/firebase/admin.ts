import * as admin from 'firebase-admin';

interface Config {
  credential: {
    privateKey: string;
    clientEmail: string;
    projectId: string;
  }
}

class FirebaseAdmin {
  private init = false;

  constructor() {
    this.initialize();
  }

  // App 초기화
  private initialize(): void {
    if (admin.apps.length !== 0) {
      this.init = true;
      return;
    }

    const config: Config = {
      credential: {
        projectId: process.env.projectId || '',
        clientEmail: process.env.clientEmail || '',
        privateKey: (process.env.privateKey || '').replace(/\\n/g, '\n'),
      }
    };

    // App 초기화 옵션 설정
    admin.initializeApp({ credential: admin.credential.cert(config.credential)});
    console.info('Finished Firebase App Init!');
  }

  /** Firestore 반환 */
  public get Firebase(): FirebaseFirestore.Firestore {
    if (!this.init) {
      this.initialize();
    }
    return admin.firestore();
  }

  public get Auth(): admin.auth.Auth {
    if (!this.init) {
      this.initialize();
    }
    return admin.auth();
  }
}

const firebaseAdmin = new FirebaseAdmin();
export default firebaseAdmin;