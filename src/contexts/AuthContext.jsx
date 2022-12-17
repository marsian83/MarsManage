import React, { useContext, useEffect, useState } from "react";

import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider() {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  async function signup(email, password) {
    let usr = await auth.createUserWithEmailAndPassword(email, password);
    await addDoc(collection(db, "users"), {
      uid: usr.user.uid,
      type: "employer",
    });
    return usr;
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
    </AuthContext.Provider>
  );
}
