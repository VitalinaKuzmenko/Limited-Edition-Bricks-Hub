import admin from "firebase-admin";
import { config } from "dotenv";

config();

const serviceAccount = {
  type: process.env.NEXT_PUBLIC_FIREBASE_TYPE,
  project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  private_key: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY,
  private_key_id: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY_ID,
  client_email: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
  client_id: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_ID,
  auth_uri: process.env.NEXT_PUBLIC_FIREBASE_AUTH_URI,
  token_uri: process.env.NEXT_PUBLIC_FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_X509_CERT_URL,
  universe_domain: process.env.NEXT_PUBLIC_FIREBASE_UNIVERSE_DOMAIN,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// admin.initializeApp({
//   credential: admin.credential.applicationDefault(), // <= THIS!
// });

// Get a Firestore instance
const db = admin.firestore();

console.log("db", db);

export { db };
