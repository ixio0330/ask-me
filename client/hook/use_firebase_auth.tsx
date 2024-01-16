'use client'

import { InAuthUser } from "@/common/models/in_auth_user";
import { useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth';
import firebaseClient from '@/common/firebase/client';
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { errorNotify } from "../components/Toast";

const useFirebaseAuth = () => {
  const [authUser, setAuthUser] = useState<InAuthUser | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  /**
   * Google 로그인
   */
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(firebaseClient.Auth, new GoogleAuthProvider());
      firebaseClient.Auth.onAuthStateChanged(authStateChanged);
    } catch (error) {
      console.log(error);
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
    try {
      setLoading(true);
      // 가입 요청
      await axios.post('/api/user', {
        uid: authState.uid,
        email: authState.email,
        displayName: authState.displayName,
        photoURL: authState.photoURL,
      });
      setAuthUser({
        uid: authState.uid,
        email: authState.email,
        photoURL: authState.photoURL,
        displayName: authState.displayName,
      });
      setLoading(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        errorNotify(error.response?.data.message ?? '로그인 중 오류가 발생했습니다.');
      }
    }
  };

  // * 자동 로그인
  useEffect(() => {
    const unsubscribe = firebaseClient.Auth.onAuthStateChanged((user) => {
      if(user) { 
        authStateChanged(user);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (authUser?.uid) {
      router.push(`/${authUser.email?.replace('@gmail.com', '')}`);
    }
  }, [authUser?.uid]);

  return {
    authUser,
    loading,
    signInWithGoogle,
    signOut,
  }
};

export default useFirebaseAuth;