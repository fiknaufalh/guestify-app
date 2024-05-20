import React, { useContext, useEffect } from "react";
import { createContext } from "react";
import { useState } from "react";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "@/firebase/firebaseConfig";
import { addDoc, getDoc, setDoc, doc } from "firebase/firestore";

type AuthContextType = {
  user: any;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<{success: boolean, msg?: string}>;
  logout: () => void;
  register: (name: string, email: string, phone: string, password: string, profileUrl: string) 
      => Promise<{success: boolean, msg?: string, data?: any}>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: undefined,
  login: async (email: string, password: string) => ({success: false}),
  logout: () => {},
  register: async (name: string, email: string, phone: string, password: string, profileUrl: string) => ({success: false}),
});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      console.log("got user: ", user)
      if (user) {
        setUser(user);
        setIsLoggedIn(true);
        updateUserData(user.uid);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    });

    return unsub;
  }, []);

  const updateUserData = async (userId) => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists) {
      const data = docSnap.data();
      setUser({...user, name: data.name, phone: data.phone, profileUrl: data.profileUrl, userId: data.userId })
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      let msg = error.message;
      if (msg.includes("(auth/invalid-email)")) msg = "Email tidak valid";
      if (msg.includes("(auth/invalid-credential")) msg = "Credential salah"
      return {success: false, msg};
    }
  }

  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true }
    } catch (error) {
      return { success: false, msg: error.message }
    }
  }

  const register = async (name: string, email: string, phone: string, password: string, profileUrl: string) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log("response.user: ", response.user);

      await setDoc(doc(db, "users", response.user.uid), {
        name,
        email,
        phone,
        profileUrl,
        userId: response.user.uid,
      });

      return {success: true, data: response.user};
    } catch (error) {
      let msg = error.message;
      if (msg.includes("(auth/invalid-email)")) msg = "Email tidak valid";
      if (msg.includes("(auth/email-already-in-use)")) msg = "Email sudah terdaftar";
      return {success: false, msg};
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, register, logout }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }

  return value;
}