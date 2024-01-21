import admin from "firebase-admin";
import serviceAccount from "./serviceAccountKey.json" assert { type: "json" }; // Replace with the path to your Firebase service account key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "YOUR_DATABSE_URL", // Replace with your Firebase database URL
});

const db = admin.database();
export default db;
