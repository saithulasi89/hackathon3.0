"use client";

import { createContext, useContext, useState, useEffect } from "react";

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider: Provides login state and functions to the app
export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Ensure this runs only in the browser
    if (typeof window !== "undefined") {
      const storedLoginState = localStorage.getItem("isLogin");
      const storedUsername = localStorage.getItem("username");
      if (storedLoginState === "true") {
        setIsLogin(true);
        setUsername(storedUsername || "");
      }
    }
  }, []);

  const login = (name) => {
    setIsLogin(true);
    setUsername(name);
    if (typeof window !== "undefined") {
      localStorage.setItem("isLogin", "true");
      localStorage.setItem("username", name);
    }
  };

  const logout = () => {
    setIsLogin(false);
    setUsername("");
    if (typeof window !== "undefined") {
      localStorage.setItem("isLogin", "false");
      localStorage.setItem("username", "");
    }
  };

  return (
    <AuthContext.Provider value={{ isLogin, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
