import firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

firebase.initializeApp(config);
export const db = firebase.firestore();

// Firestore Methods
export const createBoard = async (name, description) => {
  try {
    return await db.collection('boards').add({
      name: name,
      description: description,
      columnOrder: [],
      // created: firebase.firestore.FieldValue.serverTimestamp(),
      // author: firebase.auth().currentUser.displayName,
      // author_id: firebase.auth().currentUser.uid,
      deleteStatus: false,
    });
  } catch (exception) {
    console.error(exception.toString());
  }
};

export default firebase;
