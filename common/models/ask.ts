import { firestore } from 'firebase-admin';
export type AskStatus = 'private' | 'public';

interface AskBase {
  uid: string;
  ask: string;
  author: {
    displayName: string;
    photoURL?: string;
  } | null;
  id: string;
}

export interface AddAsk extends Omit<AskBase, 'id'> {}

export interface InAskClient extends AskBase {
  createdAt: string;
  reply?: string;
  replyedAt?: string;
  status: AskStatus;
}

export interface InAskServer extends AskBase {
  createdAt: firestore.Timestamp;
  reply?: string;
  replyedAt?: firestore.Timestamp;
  status: AskStatus;
}