import { initializeApp } from "firebase/app";
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";

// Firebase configuration from .env (Vite requires VITE_ prefix)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// ✅ DEBUG LOG - See if your .env values are loading
console.log("🔥 Firebase Config:", firebaseConfig);

let app;
let auth;

try {
  // Check for missing keys
  const missingKeys = Object.entries(firebaseConfig)
    .filter(([_, v]) => !v || typeof v !== "string" || v.trim().length === 0)
    .map(([k]) => k);

  if (missingKeys.length > 0) {
    console.warn(
      `⚠️ Missing Firebase env vars: ${missingKeys.join(", ")}. Check your .env and restart dev server.`
    );
  } else {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    console.log("✅ Firebase initialized successfully!");
  }
} catch (error) {
  console.error("❌ Failed to initialize Firebase:", error);
}

export { auth, signInWithPhoneNumber, RecaptchaVerifier };
