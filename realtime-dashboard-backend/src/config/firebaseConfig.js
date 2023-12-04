import {
  initializeApp,
  credential as _credential,
  database,
} from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json'; // Replace with the path to your Firebase service account key

initializeApp({
  credential: _credential.cert(serviceAccount),
  databaseURL: 'https://your-database-url.firebaseio.com', // Replace with your Firebase database URL
});

const db = database();
export default db;
