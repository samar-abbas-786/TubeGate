"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUsers,
  FiUser,
  FiChevronRight,
  FiSearch,
  FiLoader,
} from "react-icons/fi";

const GetEditor = () => {
  const [userlist, setUserlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  const getUserList = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("/api/USER/GetEditor");
      if (response) {
        setUserlist(response.data.editor);
      }
    } catch (error) {
      console.log("error in editor list", error);
      setError("Failed to load editors. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserList();
  }, []);

  const filteredUsers = userlist?.filter((user) =>
    user?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const cardVariants = {
    rest: { scale: 1, y: 0 },
    hover: {
      scale: 1.02,
      y: -2,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const LoadingSpinner = () => (
    <motion.div
      className="flex items-center justify-center py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full"
      />
      <span className="ml-3 text-purple-300">Loading editors...</span>
    </motion.div>
  );

  const EmptyState = () => (
    <motion.div
      className="flex flex-col items-center justify-center py-16 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-20 h-20 bg-gradient-to-br from-purple-600/20 to-violet-600/20 rounded-full flex items-center justify-center mb-6 border border-purple-500/30">
        <FiUsers size={32} className="text-purple-400" />
      </div>
      <h3 className="text-xl font-semibold text-white/90 mb-2">
        {searchTerm ? "No editors found" : "No editors available"}
      </h3>
      <p className="text-white/60 max-w-md">
        {searchTerm
          ? `No editors match "${searchTerm}". Try adjusting your search.`
          : "There are currently no editors in the system."}
      </p>
    </motion.div>
  );

  const ErrorState = () => (
    <motion.div
      className="flex flex-col items-center justify-center py-16 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-20 h-20 bg-gradient-to-br from-red-600/20 to-red-800/20 rounded-full flex items-center justify-center mb-6 border border-red-500/30">
        <FiUsers size={32} className="text-red-400" />
      </div>
      <h3 className="text-xl font-semibold text-white/90 mb-2">
        Unable to load editors
      </h3>
      <p className="text-white/60 max-w-md mb-6">{error}</p>
      <button
        onClick={getUserList}
        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-700 text-white rounded-xl hover:from-purple-500 hover:to-violet-600 transition-all duration-300 font-medium shadow-lg hover:shadow-purple-500/25"
      >
        Try Again
      </button>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/6 w-96 h-96 bg-violet-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10 p-6 pt-24 flex flex-col items-center max-w-4xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-600/20 to-violet-600/20 rounded-2xl border border-purple-500/30 mr-4">
              <FiUsers size={32} className="text-purple-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-purple-300 via-violet-300 to-purple-500 bg-clip-text text-transparent">
                Editor List
              </span>
            </h1>
          </div>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Browse and connect with our talented video editors
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className="w-full max-w-lg mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative">
            <FiSearch
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search editors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            />
          </div>
        </motion.div>

        {/* Stats Bar */}
        {!loading && !error && (
          <motion.div
            className="mb-8 px-6 py-3 bg-gradient-to-r from-purple-900/20 to-violet-900/20 rounded-2xl border border-purple-500/20 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <span className="text-white/80">
              {filteredUsers?.length === 1
                ? "1 editor"
                : `${filteredUsers?.length} editors`}
              {searchTerm && ` matching "${searchTerm}"`}
            </span>
          </motion.div>
        )}

        {/* Content Area */}
        <div className="w-full max-w-2xl">
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorState />
          ) : filteredUsers?.length === 0 ? (
            <EmptyState />
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              <AnimatePresence>
                {filteredUsers?.map((user, index) => (
                  <motion.div
                    key={user?.id}
                    variants={itemVariants}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link href={`/Editor-List/${user?.id}`}>
                      <motion.div
                        className="group relative w-full bg-gradient-to-r from-white/5 to-white/10 border border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-purple-500/10 transition-all duration-300 backdrop-blur-sm overflow-hidden"
                        variants={cardVariants}
                        initial="rest"
                        whileHover="hover"
                      >
                        {/* Hover Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-violet-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-all duration-500" />

                        {/* Content */}
                        <div className="relative z-10 flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            {/* Avatar */}
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-600/30 to-violet-600/30 rounded-xl flex items-center justify-center border border-purple-500/30 group-hover:scale-105 transition-transform duration-300">
                              <FiUser size={20} className="text-purple-300" />
                            </div>

                            {/* Editor Info */}
                            <div>
                              <h3 className="text-lg font-semibold text-white group-hover:text-purple-200 transition-colors duration-300">
                                {user?.name}
                              </h3>
                              <p className="text-white/60 text-sm">
                                Video Editor
                              </p>
                            </div>
                          </div>

                          {/* Arrow Icon */}
                          <motion.div
                            className="text-purple-400 group-hover:text-purple-300 transition-colors duration-300"
                            whileHover={{ x: 4 }}
                            transition={{ duration: 0.2 }}
                          >
                            <FiChevronRight size={20} />
                          </motion.div>
                        </div>

                        {/* Bottom Border Glow */}
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetEditor;
