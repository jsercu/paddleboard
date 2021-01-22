import React, { useState, useEffect, useRef, useContext, createContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import firebase, { firestore } from '../firebase';
import 'firebase/auth';

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export function useAuth() {
  return useContext(authContext);
}

// Provider hook that creates auth object and handles state
export function useProvideAuth() {
  const [user, setUser] = useState(null);
  const isInitialMount = useRef(true);
  const [userProfile, setUserProfile] = useState(null);

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signin = async (email, password) => {
    try {
      const response = await firebase.auth().signInWithEmailAndPassword(email, password);
      const user = response.user;
      setUser(user);
      return user;
    } catch (exception) {
      console.error(exception.toString());
    }
  };

  const signinWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const response = await firebase.auth().signInWithPopup(provider);
      const user = response.user;
      setUser(user);
      return user;
    } catch (exception) {
      console.error(exception.toString());
    }
  };

  const signup = async (email, password) => {
    try {
      const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const user = response.user;
      setUser(user);
      return user;
    } catch (exception) {
      console.error(exception.toString());
    }
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
      });
  };

  const sendPasswordResetEmail = (email) => {
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        return true;
      });
  };

  const confirmPasswordReset = (code, password) => {
    return firebase
      .auth()
      .confirmPasswordReset(code, password)
      .then(() => {
        return true;
      });
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
      } catch (error) {
        console.error('Error creating user', console.error);
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
    } catch (error) {
      console.error('Error fetching user', error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
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
    }
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
