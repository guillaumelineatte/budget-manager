import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Configuration Firebase avec fallback pour les variables manquantes
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'test-api-key',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'test.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'test-project',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'test.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:123456789:web:test',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-TEST'
};

// Debug: afficher les variables d'environnement (à retirer en production)
console.log('Firebase config:', {
  apiKey: firebaseConfig.apiKey ? '***' + firebaseConfig.apiKey.slice(-4) : 'undefined',
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId
});

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);