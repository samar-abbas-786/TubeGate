"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaUserEdit, FaUser } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "context/authContext";
import { useSession } from "next-auth/react";

export default function RoleSelection() {
  const { user, role, setRole } = useAuth();
  const { data: session } = useSession();
  const router = useRouter();
  // useEffect(() => {
  //   const userData = JSON.parselocalStorage.getItem("user");
  //   if (userData) {
  //     setUser(JSON.parse(userData));
  //   }
  // }, []);
  console.log("user", user);
  console.log("session", session);

  const handleContinue = async () => {
    if (!role) return alert("Please select a role");
    try {
      const response = await axios.post("/api/Profession", {
        role: role,
        user_id: user.id,
      });
      console.log("Successfully select role", response);
      localStorage.setItem("userRole", role);
      router.push("/");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-purple-900 p-4">
      <div className="bg-black border border-purple-700/50 rounded-xl shadow-lg shadow-purple-800/30 w-full max-w-md p-8 text-white">
        <h2 className="text-3xl font-bold text-center text-purple-400 mb-6">
          Select Your Role
        </h2>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <button
            onClick={() => setRole("editor")}
            className={`flex flex-col items-center p-6 rounded-lg border transition-all ${
              role === "editor"
                ? "border-purple-500 bg-purple-800/20 shadow-purple-500/20"
                : "border-gray-700 hover:border-purple-500"
            }`}
          >
            <FaUserEdit className="text-3xl mb-2 text-purple-300" />
            <span className="text-lg">Editor</span>
          </button>

          <button
            onClick={() => setRole("user")}
            className={`flex flex-col items-center p-6 rounded-lg border transition-all ${
              role === "user"
                ? "border-purple-500 bg-purple-800/20 shadow-purple-500/20"
                : "border-gray-700 hover:border-purple-500"
            }`}
          >
            <FaUser className="text-3xl mb-2 text-purple-300" />
            <span className="text-lg">User</span>
          </button>
        </div>

        <button
          onClick={handleContinue}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 rounded-lg font-medium shadow-lg transition-all"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
