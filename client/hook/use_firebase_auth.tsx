import { InAuthUser } from "@/common/models/in_auth_user";
import { useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth';
import firebaseClient from '@/common/firebase/client';

const uesFirebaseAuth = () => {
  const [authUser, setAuthUser] = useState<InAuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * Google 로그인
   */
  const signInWithGoogle = async () => {
    try {
      const signInResult = await signInWithPopup(firebaseClient.Auth, new GoogleAuthProvider());
      if (signInResult.user) {
        console.info(signInResult.user);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const clear = () => {
    setAuthUser(null);
    setLoading(true);
  };

  const signOut = () => firebaseClient.Auth.signOut().then(clear);

  const authStateChanged = async (authState: User | null) => {
    if (authState === null) {
      setAuthUser(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    setAuthUser({
      uid: authState.uid,
      email: authState.email,
      photoURL: authState.photoURL,
      displayName: authState.displayName,
    });
    setLoading(false);
  } 

  useEffect(() => {
    const unsubscribe = firebaseClient.Auth.onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    loading,
    signInWithGoogle,
    signOut,
  }
};

export default uesFirebaseAuth;