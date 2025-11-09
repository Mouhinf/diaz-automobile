import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";
import { Analytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;
let analytics: Analytics | null = null;

// Check if essential Firebase environment variables are present
const isFirebaseConfigComplete =
  firebaseConfig.apiKey &&
  firebaseConfig.authDomain &&
  firebaseConfig.projectId &&
  firebaseConfig.storageBucket &&
  firebaseConfig.appId;

if (!isFirebaseConfigComplete) {
  console.error(
    "Firebase configuration is incomplete. Please ensure all NEXT_PUBLIC_FIREBASE_* environment variables are set in your .env.local file."
  );
  // The app will continue to run, but Firebase services will not be available.
  // Components attempting to use `db`, `auth`, etc., will receive `null` and might throw more specific errors.
} else {
  // Initialize Firebase only if configuration is complete
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);

  // Import getAnalytics dynamically and initialize only on the client side
  if (typeof window !== 'undefined' && firebaseConfig.measurementId) {
    import("firebase/analytics").then(({ getAnalytics }) => {
      if (app) { // Ensure app is initialized before getting analytics
        analytics = getAnalytics(app);
      }
    }).catch(e => console.error("Failed to load Firebase Analytics:", e));
  }
}

export { app, auth, db, storage, analytics };