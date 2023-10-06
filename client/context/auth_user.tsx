import { createContext, ReactNode, useContext } from 'react';
import { InAuthUser } from "@/common/models/in_auth_user";
import uesFirebaseAuth from '../hook/use_firebase_auth';

interface InAuthUserContext {
  authUser: InAuthUser | null;
  loading: boolean;
  signInWithGoogle: () => void;
  signOut: () => void;
}

const AuthUserContext = createContext<InAuthUserContext>({
  authUser: null,
  loading: true,
  signInWithGoogle: async () => {},
  signOut: () => {},
});

export const AuthUserProvider = ({children}: {children: ReactNode}) => {
  const auth = uesFirebaseAuth();
  return (
    <AuthUserContext.Provider value={auth}>
      { children }
    </AuthUserContext.Provider>
  );
};

export const useAuth = () => useContext(AuthUserContext);
