import { InAuthUser } from "@/common/models/in_auth_user";
import { useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth';
import firebaseClient from '@/common/firebase/client';
import { useRouter } from "next/router";
import axios, { AxiosError } from "axios";
import { useToast } from "@chakra-ui/react";
import { CustomError } from "@/server/error";

const uesFirebaseAuth = () => {
  const [authUser, setAuthUser] = useState<InAuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const toast = useToast();

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
      await axios.post('/api/user', {
        uid: authState.uid,
        email: authState.email,
        displayName: authState.displayName,
        photoURL: authState.photoURL,
      });
      setLoading(true);
      setAuthUser({
        uid: authState.uid,
        email: authState.email,
        photoURL: authState.photoURL,
        displayName: authState.displayName,
      });
      setLoading(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          title: error.response?.data.message ?? '로그인 중 오류가 발생했습니다.',
          position: 'top-right',
          colorScheme: 'red',
        });
      }
    }
  };

  // * 자동 로그인
  // useEffect(() => {
  //   const unsubscribe = firebaseClient.Auth.onAuthStateChanged(authStateChanged);
  //   return () => unsubscribe();
  // }, []);

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

export default uesFirebaseAuth;