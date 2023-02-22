import { firestore } from 'firebase-admin';

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
  deny: boolean;
}

export interface InAskServer extends AskBase {
  createdAt: firestore.Timestamp;
  reply?: string;
  replyedAt?: firestore.Timestamp;
  deny: boolean;
}

export interface SetAskStatus {
  uid: string;
  askId: string;
  deny: boolean;
}