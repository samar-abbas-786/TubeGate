"use client";
import {
  FaSignInAlt,
  FaArrowRight,
  FaUserShield,
  FaUserEdit,
  FaUser,
} from "react-icons/fa";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useEffect } from "react";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/authContext";
import { useSession, signIn, signOut, getProviders } from "next-auth/react";

const LoginPage = () => {
  const [providers, setProviders] = useState([]);

  const { data: session } = useSession();
  const handleOAuth = async (id) => {
    signIn(id, { callbackUrl: "/" });
  };
  useEffect(() => {
    const setUpProvider = async () => {
      const response = await getProviders();
      if (response) {
        setProviders(response);
      } else {
        console.log("No providers");
      }
    };

    setUpProvider();
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser, role, setRole } = useAuth();

  const router = useRouter();
  const handleLogin = async () => {
    try {
      const response = await axios.post("/api/USER/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const loggedInUser = response.data.user;

        console.log("user", loggedInUser);
        setUser(loggedInUser);

        const extractedRole = loggedInUser?.profession?.[0]?.role || "user";
        setRole(extractedRole);

        localStorage.setItem("user", JSON.stringify(loggedInUser));
        localStorage.setItem("userRole", extractedRole);

        router.push("/");
      } else {
        console.warn("Unexpected status:", response.status);
        router.push("/Login");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      router.push("/Login");
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-black border border-purple-900/30 rounded-xl shadow-lg shadow-purple-900/20 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <FaSignInAlt className="mx-auto text-purple-500 text-4xl mb-3" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Access Dashboard
          </h1>
          <p className="text-gray-400 mt-2">Login with your credentials</p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black border border-purple-900/50 rounded-lg px-4 py-3 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-purple-900/50 rounded-lg px-4 py-3 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            onClick={() => handleLogin()}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-purple-900 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-purple-500/30"
          >
            Login <FaArrowRight />
          </button>
          {/* OAuth */}
          {!session?.user &&
            Object.values(providers).map((provider) => (
              <button
                key={provider.id}
                onClick={() => handleOAuth(provider.id)}
                className="w-full bg-gradient-to-r py-3 rounded-lg font-medium border-[1px] border-white transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-purple-500/30 mt-6"
              >
                <FcGoogle size={30} /> Sign up with {provider.name}
              </button>
            ))}

          {session?.user && (
            <div className="mt-4 text-center">
              <button
                onClick={() => {
                  localStorage.removeItem("user");
                  localStorage.removeItem("userRole");
                  signOut();
                }}
                className="text-purple-400 hover:text-purple-300 transition"
              >
                Sign out
              </button>
            </div>
          )}
        </div>

        <div className="mt-6 text-center text-gray-400">
          New to TubeGate?{" "}
          <Link
            href="/Register"
            className="text-purple-400 hover:text-purple-300 transition"
          >
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
