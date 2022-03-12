import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env['NX_FIREBASE_API_KEY'],
  authDomain: process.env['NX_FIREBASE_AUTH_ENDPOINT'],
  databaseURL: process.env['NX_FIREBASE_DB_ENDPOINT'],
  projectId: process.env['NX_FIREBASE_PROJECT_ID'],
  storageBucket: process.env['NX_FIREBASE_BUCKET_ENDPOINT'],
  messagingSenderId: process.env['NX_FIREBASE_MESSAGING_SENDER_ID'],
  appId: process.env['NX_FIREBASE_APP_ID'],
  measurementId: process.env['NX_FIREBASE_MEASUREMENT_ID'],
};

const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
export const database = getDatabase(app);
export const auth = getAuth(app);
