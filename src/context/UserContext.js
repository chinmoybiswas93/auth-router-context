import React, { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const AuthContext = createContext();
const auth = getAuth(app);

const UserContext = ({ children }) => {
  const [user, setUser] = useState({ displayName: "Musa Akash" });

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth)
  }

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (currentUser)=> {
        setUser(currentUser);
        console.log('auth changed' , currentUser)
    })

    return () => {
        unsubscribe();
    }
  },[])



  const authInfo = { user, createUser, signIn, setUser, logOut };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default UserContext;
