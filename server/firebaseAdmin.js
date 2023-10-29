import admin from "firebase-admin";

const serviceAccount =
  "./limited-edition-bricks-hub-firebase-adminsdk-td30l-1e7f8dc835.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Get a Firestore instance
const db = admin.firestore();

console.log("db", db);

export { db };
