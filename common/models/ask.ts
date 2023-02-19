export interface AddAsk {
  uid: string;
  ask: string;
  author: {
    displayName: string;
    photoURL?: string;
  } | null;
}