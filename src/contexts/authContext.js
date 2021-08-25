import {
  createContext, useContext,
  useEffect, useState
} from 'react';
import { firebaseAuth } from '../firebase';

const authContext = createContext();

function useAuth() {
  return useContext(authContext);
}

function AuthProvider({ children }) {
  const [ currentUser, setCurrentUser ] = useState()
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    return firebaseAuth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })
  }, [])

  function signup(email, password) {
    return firebaseAuth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return firebaseAuth.signInWithEmailAndPassword(email, password);
  }

  function logout(email, password) {
    return firebaseAuth.signOut();
  }

  function resetPassword(email) {
    return firebaseAuth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  function updateName(name) {
    return currentUser.updateProfile({ displayName: name })
  }

const value = {
  currentUser,
  signup,
  login,
  logout,
  resetPassword,
  updateEmail,
  updatePassword,
  updateName
};

  return (
    <authContext.Provider value={ value }>
      {!loading && children}
    </authContext.Provider>
  );
}

export { useAuth, AuthProvider };
