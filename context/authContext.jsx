"use client";
import { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [video, setVideo] = useState({
    title: "",
    description: "",
    privacyStatus: "",
    url: "",
  });

  useEffect(() => {
    const localuser = JSON.parse(localStorage.getItem("user"));
    if (localuser) setUser(localuser);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, video, setVideo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
