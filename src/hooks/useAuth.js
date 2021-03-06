import React, { useState, useEffect, useContext, createContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import firebase, { firestore } from '../firebase';
import 'firebase/auth';

const authContext = createContext();

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export function useAuth() {
  return useContext(authContext);
}

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Provider hook that creates auth object and handles state
export function useProvideAuth() {
  const [user, setUser] = useLocalStorage('user', null);
  const [userProfile, setUserProfile] = useState(null);

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signin = async (email, password) => {
    try {
      const { user } = await firebase.auth().signInWithEmailAndPassword(email, password);
      setUser(user);
    } catch (exception) {
      console.error(exception);
    }
  };

  const signinWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const { user } = await firebase.auth().signInWithPopup(provider);
      const userProfile = await createUserDocument(user);
      setUser(user);
      setUserProfile(userProfile);
    } catch (exception) {
      console.error(exception);
    }
  };

  const signup = async (email, password) => {
    try {
      const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const userProfile = await createUserDocument(user);
      setUser(user);
      setUserProfile(userProfile);
    } catch (exception) {
      console.error(exception);
    }
  };

  const signout = async () => {
    try {
      await firebase.auth().signOut();
      setUser(null);
    } catch (exception) {
      console.error(exception);
    }
  };

  const sendPasswordResetEmail = async (email) => {
    try {
      firebase.auth().sendPasswordResetEmail(email);
    } catch (exception) {
      console.error(exception);
    }
  };

  const confirmPasswordReset = async (code, password) => {
    try {
      firebase.auth().confirmPasswordReset(code, password);
    } catch (exception) {
      console.error(exception);
    }
  };

  const createUserDocument = async (user, additionalData) => {
    // If there is no user, let's not do this.
    if (!user) return;

    // Get a reference to the location in the Firestore where the user
    // document may or may not exist.
    const userRef = firestore.doc(`users/${user.uid}`);

    // Go and fetch a document from that location.
    const snapshot = await userRef.get();

    // If there isn't a document for that user. Let's use information
    // that we got from either Google or our sign up form.
    if (!snapshot.exists) {
      const { displayName, email, photoURL } = user;
      try {
        await userRef.set({
          displayName,
          email,
          photoURL,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          ...additionalData,
        });
      } catch (exception) {
        console.error('Error creating user', exception);
      }
    }

    // Get the document and return it, since that's what we're
    // likely to want to do next.
    return getUserDocument(user.uid);
  };

  const getUserDocument = async (uid) => {
    if (!uid) return null;
    try {
      const userDocument = await firestore.collection('users').doc(uid).get();
      return { uid, ...userDocument.data() };
    } catch (exception) {
      console.error('Error fetching user', exception);
    }
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user || null);
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = firestore
      .collection('users')
      .doc(user?.uid)
      .onSnapshot((doc) => {
        const newUserProfile = doc.data();
        setUserProfile(newUserProfile);
      });
    return () => {
      unsubscribe();
    };
  }, [user]);

  // Return the user object and auth methods
  return {
    user,
    userProfile,
    signin,
    signinWithGoogle,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
}
