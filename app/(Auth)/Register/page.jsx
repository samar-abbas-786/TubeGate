"use client";
import { FaUserPlus, FaArrowRight } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut, getProviders } from "next-auth/react";
import { useAuth } from "context/authContext";

const RegisterPage = () => {
  const { setUser, user } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [providers, setProviders] = useState({});

  const { data: session } = useSession();

  // ✅ OAuth handler
  const handleOAuth = async (id) => {
    await signIn(id, { callbackUrl: "/Profession" });
  };

  // ✅ Get providers
  useEffect(() => {
    const setUpProvider = async () => {
      const response = await getProviders();
      if (response) {
        setProviders(response);
      }
    };
    setUpProvider();
  }, []);

  // ✅ If user is already authenticated, redirect from OAuth login
  useEffect(() => {
    if (session?.user) {
      localStorage.setItem("user", JSON.stringify(session.user));
      setUser(session.user);
      router.push("/Profession");
    }
  }, [session]);

  // ✅ Manual Registration
  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/USER/registration", {
        name,
        email,
        password,
        image,
      });

      if (!res?.data?.user) {
        return console.error("No user returned from API");
      }

      const newUser = res.data.user;
      localStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);
      router.push("/Profession");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 flex items-center justify-center p-4 pt-20 font-sans">
      {!user ? (
        <div className="w-full max-w-md bg-black border border-purple-900/30 rounded-2xl shadow-xl shadow-purple-900/30 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <FaUserPlus className="mx-auto text-purple-500 text-4xl mb-3" />
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              Join TubeGate
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Create your account below
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleRegistration}>
            <div>
              <label className="block text-gray-300 text-sm mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black border border-purple-800/40 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
                placeholder="e.g. John Doe"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black border border-purple-800/40 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-purple-800/40 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-3 rounded-xl font-semibold tracking-wide hover:from-purple-700 hover:to-purple-900 transition-all shadow-lg hover:shadow-purple-500/30 flex items-center justify-center gap-2"
            >
              Register <FaArrowRight />
            </button>
          </form>

          {/* OAuth */}
          {!session?.user &&
            Object.values(providers).map((provider) => (
              <button
                key={provider.id}
                onClick={() => handleOAuth(provider.id)}
                className="w-full mt-6 flex items-center justify-center gap-3 px-4 py-3 border border-white/20 rounded-xl text-sm font-medium bg-gradient-to-r from-white/5 to-white/10 hover:from-white/10 hover:to-white/20 transition-all shadow-md hover:shadow-purple-500/20"
              >
                <FcGoogle size={24} />
                <span className="text-white">Sign up with {provider.name}</span>
              </button>
            ))}

          {/* Already logged in */}
          {session?.user && (
            <div className="mt-4 text-center">
              <button
                onClick={() => {
                  localStorage.clear();
                  signOut();
                }}
                className="text-purple-400 hover:text-purple-300 transition"
              >
                Sign out
              </button>
            </div>
          )}

          <div className="mt-6 text-center text-gray-400 text-sm">
            Already have an account?{" "}
            <Link
              href="/Login"
              className="text-purple-400 hover:text-purple-300 font-medium transition"
            >
              Login here
            </Link>
          </div>
        </div>
      ) : (
        <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-r from-purple-900 to-black px-4">
          <div className="bg-black border border-purple-800 rounded-2xl shadow-xl p-8 max-w-md w-full text-center text-white space-y-6">
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Already Registered
            </h1>
            <p className="text-gray-400">You are already logged in.</p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg shadow-md text-white font-semibold hover:from-purple-700 hover:to-purple-900 transition-all"
            >
              Explore
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
