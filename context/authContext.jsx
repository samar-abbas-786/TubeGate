"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { data: session } = useSession();

  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [video, setVideo] = useState({
    title: "",
    description: "",
    privacyStatus: "",
    url: "",
  });

  // ✅ If session is available, set user & role
  useEffect(() => {
    if (session?.user) {
      setUser(session.user);
      setRole(session.user.role || null);
      localStorage.setItem("user", JSON.stringify(session.user));
      if (session.user.role) {
        localStorage.setItem("userRole", session.user.role);
      }
    }
  }, [session]);

  // ✅ If no session, try to get from localStorage
  useEffect(() => {
    if (!session?.user) {
      const localUser = localStorage.getItem("user");
      const localRole = localStorage.getItem("userRole");

      if (localUser) setUser(JSON.parse(localUser));
      if (localRole) setRole(localRole);
    }
  }, [session]);

  return (
    <AuthContext.Provider
      value={{ user, setUser, video, setVideo, role, setRole }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
