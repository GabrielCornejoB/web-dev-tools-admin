import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'web-dev-tools-47601.firebaseapp.com',
  projectId: 'web-dev-tools-47601',
  storageBucket: 'web-dev-tools-47601.appspot.com',
  messagingSenderId: '844949998980',
  appId: '1:844949998980:web:f602e6227fc413542521d1',
};

export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
