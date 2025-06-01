"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FiUser,
  FiUsers,
  FiSend,
  FiEye,
  FiSearch,
  FiLoader,
} from "react-icons/fi";

const Getuser = () => {
  const [userlist, setUserlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const getUserList = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/USER/GetUser");
      if (response) setUserlist(response.data.userlist);
    } catch (error) {
      console.log("error in user list", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserList();
  }, []);

  const filteredUsers = userlist?.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center animate-fade-in-up">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600/30 to-violet-600/30 rounded-full flex items-center justify-center mb-4 mx-auto border border-purple-400/50">
            <FiLoader className="text-purple-400 text-2xl animate-spin" />
          </div>
          <p className="text-white/60">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10 px-4 py-16 pt-24">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600/30 to-violet-600/30 rounded-full mb-6 border border-purple-400/50 backdrop-blur-sm">
              <FiUsers className="text-purple-400 text-3xl" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-200 via-white to-purple-200 bg-clip-text text-transparent mb-4">
              User Directory
            </h1>

            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Connect with our community of creative professionals and content
              creators
            </p>

            {/* Stats Bar */}
            <div className="flex items-center justify-center gap-8 mt-8 text-sm">
              <div className="flex items-center gap-2 text-purple-300">
                <FiUser />
                <span>{userlist?.length} Total Users</span>
              </div>
              <div className="flex items-center gap-2 text-purple-300">
                <FiEye />
                <span>Active Community</span>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-8 animate-fade-in-up animation-delay-200">
            <div className="relative max-w-md mx-auto">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400/50 focus:bg-white/15 transition-all duration-300 backdrop-blur-sm"
              />
            </div>
          </div>

          {/* User Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-stagger-container">
            {filteredUsers?.map((user, index) => (
              <div
                key={user.id || index}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl relative overflow-hidden group hover:border-purple-400/50 transition-all duration-500 animate-fade-in-up"
                style={{ animationDelay: `${(index % 9) * 0.1 + 0.3}s` }}
              >
                {/* Card Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-violet-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="relative z-10">
                  {/* Avatar */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-purple-600/30 to-violet-600/30 border-2 border-purple-400/50 shadow-xl flex items-center justify-center text-white backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                      <span className="text-xl font-bold bg-gradient-to-br from-purple-200 to-white bg-clip-text text-transparent">
                        {user.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>

                    {/* Status Indicator */}
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-br from-green-400 to-green-600 rounded-full border-2 border-black/50 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-200 transition-colors duration-300">
                      {user.name}
                    </h3>
                    <p className="text-white/60 text-sm">Content Creator</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Link
                      href={`/User-List/${user.id}`}
                      className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-300 font-medium border border-white/20 hover:border-purple-400/50 backdrop-blur-sm flex items-center justify-center group/btn text-sm"
                    >
                      <FiEye className="mr-2 group-hover/btn:scale-110 transition-transform duration-300" />
                      View
                    </Link>

                    <Link
                      href={`/Content-Upload/${user.id}`}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-violet-700 text-white rounded-xl hover:from-purple-500 hover:to-violet-600 transition-all duration-300 font-medium shadow-lg hover:shadow-purple-500/25 flex items-center justify-center group/btn relative overflow-hidden text-sm"
                    >
                      <span className="relative z-10 flex items-center">
                        <FiSend className="mr-2 group-hover/btn:rotate-12 transition-transform duration-300" />
                        Send
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                    </Link>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-2 right-2 w-12 h-12 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-2 left-2 w-8 h-8 bg-gradient-to-tr from-violet-500/10 to-transparent rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredUsers?.length === 0 && !loading && (
            <div className="text-center py-12 animate-fade-in-up">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-600/20 to-gray-800/20 rounded-full flex items-center justify-center mb-6 border border-gray-500/30 mx-auto">
                <FiSearch size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-white/90 mb-2">
                No Users Found
              </h3>
              <p className="text-white/60">
                {searchTerm
                  ? `No users match "${searchTerm}"`
                  : "No users available at the moment"}
              </p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
          animation-fill-mode: both;
        }

        .animate-stagger-container {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }

        .animate-fade-in-up[style*="animation-delay"] {
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default Getuser;
