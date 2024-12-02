// utils/firebase.js
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

export const signIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error('Error signing in:', error);
  }
};
