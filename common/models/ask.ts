import { firestore } from 'firebase-admin';
export type AskStatus = 'private' | 'public';

interface AskBase {
  uid: string;
  ask: string;
  author: {
    displayName: string;
    photoURL?: string;
  } | null;
}

export interface AddAsk extends AskBase {}

export interface InAskClient extends AddAsk {
  createdAt: string;
  reply?: string;
  replyedAt?: string;
  status: AskStatus;
}

export interface InAskServer extends AddAsk {
  createdAt: firestore.Timestamp;
  reply?: string;
  replyedAt?: firestore.Timestamp;
  status: AskStatus;
}