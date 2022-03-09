import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD6tPSMpQRaG_Hte5mgIrqpC6MXjgGIjC8',
  authDomain: 'spotify-app-4c4f3.firebaseapp.com',
  databaseURL: 'https://spotify-app-4c4f3-default-rtdb.firebaseio.com',
  projectId: 'spotify-app-4c4f3',
  storageBucket: 'spotify-app-4c4f3.appspot.com',
  messagingSenderId: '752886530164',
  appId: '1:752886530164:web:db33e70a9f2e8c4ccb5121',
  measurementId: 'G-HHMLLYXH89',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
