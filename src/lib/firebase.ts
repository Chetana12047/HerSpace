/**
 * Firebase placeholder.
 *
 * This file scaffolds where a real Firebase app would be initialized. No real
 * network calls happen here — data is currently persisted via `storage.ts`
 * (localStorage). To go live, install `firebase`, fill the config from your
 * Firebase console, and wire the storage functions to Firestore.
 */

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? "PLACEHOLDER_API_KEY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? "herspace.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? "herspace-placeholder",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? "herspace.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID ?? "000000000000",
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? "1:000000000000:web:placeholder",
}

export const isFirebaseConfigured = false

// Example of how initialization would look once `firebase` is installed:
//
// import { initializeApp } from "firebase/app"
// import { getFirestore } from "firebase/firestore"
// export const app = initializeApp(firebaseConfig)
// export const db = getFirestore(app)
