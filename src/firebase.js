import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7xzuy71leqNpFhBopAWr4uIQO6KzPpJU",
  authDomain: "arenaplay-fc65e.firebaseapp.com",
  projectId: "arenaplay-fc65e",
  storageBucket: "arenaplay-fc65e.firebasestorage.app",
  messagingSenderId: "504507935748",
  appId: "1:504507935748:web:985ab8c0223b18ef3a9951",
  measurementId: "G-01JWG4HM67"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage, analytics };
