"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithRedirect,
  updateProfile,
} from "firebase/auth";
import { auth } from "../lib/firebase.config";
import axios from "axios";

const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Register
  const register = (email, password) => {
    setLoading(true);
    // Bypass: Simulate successful registration with Firebase
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = {
          email,
          displayName: email.split("@")[0],
          photoURL: "https://i.pravatar.cc/150?img=33",
        };
        resolve({ user: mockUser });
      }, 500);
    });
  };

  // Login
  const login = (email, password) => {
    setLoading(true);
    // Bypass: Simulate successful login
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = {
          email,
          displayName: email.split("@")[0],
          photoURL: "https://i.pravatar.cc/150?img=33",
        };
        setUserWithPersistence(mockUser);
        resolve({ user: mockUser });
      }, 500);
    });
  };

  // Google Login
  const googleLogin = () => {
    setLoading(true);
    // Bypass: Simulate Google redirect/popup login instantly
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = {
          email: "testuser@gmail.com",
          displayName: "Test User",
          photoURL: "https://i.pravatar.cc/150?img=33",
        };
        setUserWithPersistence(mockUser);
        resolve({ user: mockUser });
      }, 500);
    });
  };

  // Update Profile
  const updateUserProfile = (name, photoURL) => {
    return new Promise((resolve) => {
      setUser((prev) => {
        const updated = prev ? { ...prev, displayName: name, photoURL: photoURL } : null;
        if (updated) localStorage.setItem("rentride_user", JSON.stringify(updated));
        return updated;
      });
      resolve();
    });
  };

  // Logout
  const logout = async () => {
    setLoading(true);
    try {
      await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
    } catch (error) {
      console.error("Logout API failed", error);
    }
    setUserWithPersistence(null);
    setLoading(false);
  };

  useEffect(() => {
    // Load initial user state from local storage to survive page reload
    const storedUser = localStorage.getItem("rentride_user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      // Fetch JWT token for current session
      axios.post(`${API_URL}/jwt`, { email: parsedUser.email }, { withCredentials: true })
        .catch((err) => console.error("JWT bypass reload error:", err));
    }
    setLoading(false);
  }, [API_URL]);

  // Hook to update local storage when user state changes
  const setUserWithPersistence = async (newUser) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem("rentride_user", JSON.stringify(newUser));
      try {
        await axios.post(`${API_URL}/jwt`, { email: newUser.email }, { withCredentials: true });
      } catch (err) {
        console.error("JWT bypass login error:", err);
      }
    } else {
      localStorage.removeItem("rentride_user");
    }
  };

  const value = {
    user,
    loading,
    register,
    login,
    googleLogin,
    logout,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
