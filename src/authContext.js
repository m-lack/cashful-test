"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { isExpired, decodeToken } from "react-jwt";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("loading");

  const logout = () => {
    window.localStorage.setItem("token", "");
    // window.location.href = "/signin";
  };

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    setStatus("loading");
    if (token) {
      const decodedToken = decodeToken(token);
      const isTokenExpired = isExpired(token);

      if (!isTokenExpired) {
        setStatus("authenticated");
        setUser(decodedToken.user_metadata);
      } else {
        setStatus("unauthenticated");
        setUser(null);
        logout();
      }
    } else {
      setStatus("unauthenticated");
      setUser(null);
      logout();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, status, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
