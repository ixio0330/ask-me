import { InAuthUser } from "@/common/models/in_auth_user";
import { useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth';
import firebaseClient from '@/common/firebase/client';
import { useRouter } from "next/router";
import axios from "axios";

const uesFirebaseAuth = () => {
  const [authUser, setAuthUser] = useState<InAuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  /**
   * Google 로그인
   */
  const signInWithGoogle = async () => {
    try {
      const { user } = await signInWithPopup(firebaseClient.Auth, new GoogleAuthProvider());
      if (user) {
        const result = await axios.post('/api/user', {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
        console.log(result);
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

  useEffect(() => {
    if (authUser?.uid) {
      router.push(`/${authUser.displayName}`);
    }
  }, [authUser?.uid]);

  return {
    authUser,
    loading,
    signInWithGoogle,
    signOut,
  }
};

export default uesFirebaseAuth;