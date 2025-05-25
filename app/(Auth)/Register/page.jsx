"use client";
import {
  FaUserPlus,
  FaArrowRight,
  FaUserShield,
  FaUserEdit,
  FaUser,
} from "react-icons/fa";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
const RegisterPage = () => {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState("user");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegistration = async () => {
    try {
      const user = await axios.post("/api/USER/registration", {
        name,
        email,
        password,
        role: selectedRole,
      });
      if (!user) {
        return;
      }
      localStorage.setItem("user", JSON.stringify(user));

      console.log("user created", user);
      router.push("/");
    } catch (error) {
      console.log("error in frontend of register", error);
      router.push("/Register");
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-black border border-purple-900/30 rounded-xl shadow-lg shadow-purple-900/20 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <FaUserPlus className="mx-auto text-purple-500 text-4xl mb-3" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Join TubeGate
          </h1>
          <p className="text-gray-400 mt-2">Select your role to continue</p>
        </div>

        {/* Role Selection */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <button
            type="button"
            onClick={() => setSelectedRole("admin")}
            className={`p-3 border rounded-lg flex flex-col items-center transition-all ${
              selectedRole === "admin"
                ? "border-purple-500 bg-purple-900/20 shadow-purple-500/20"
                : "border-purple-900/50 hover:border-purple-500"
            }`}
          >
            <FaUserShield className="text-xl mb-1 text-purple-400" />
            <span className="text-sm">Admin</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedRole("editor")}
            className={`p-3 border rounded-lg flex flex-col items-center transition-all ${
              selectedRole === "editor"
                ? "border-purple-500 bg-purple-900/20 shadow-purple-500/20"
                : "border-purple-900/50 hover:border-purple-500"
            }`}
          >
            <FaUserEdit className="text-xl mb-1 text-purple-400" />
            <span className="text-sm">Editor</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedRole("user")}
            className={`p-3 border rounded-lg flex flex-col items-center transition-all ${
              selectedRole === "user"
                ? "border-purple-500 bg-purple-900/20 shadow-purple-500/20"
                : "border-purple-900/50 hover:border-purple-500"
            }`}
          >
            <FaUser className="text-xl mb-1 text-purple-400" />
            <span className="text-sm">User</span>
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              className="w-full bg-black border border-purple-900/50 rounded-lg px-4 py-3 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              className="w-full bg-black border border-purple-900/50 rounded-lg px-4 py-3 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Password</label>
            <input
              type="password"
              className="w-full bg-black border border-purple-900/50 rounded-lg px-4 py-3 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition"
              placeholder="••••••••"
              required
            />
          </div>

          <input type="hidden" name="role" value={selectedRole} />

          <button
            onClick={() => handleRegistration()}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-purple-900 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-purple-500/30 mt-6"
          >
            Register as {selectedRole} <FaArrowRight />
          </button>
        </div>

        <div className="mt-6 text-center text-gray-400">
          Already have an account?{" "}
          <Link
            href="/Login"
            className="text-purple-400 hover:text-purple-300 transition"
          >
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
