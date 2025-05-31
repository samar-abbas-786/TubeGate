import { motion } from "framer-motion";
import {
  FiMail,
  FiUser,
  FiStar,
  FiArrowLeft,
  FiEdit3,
  FiCamera,
} from "react-icons/fi";
import { MdVerified } from "react-icons/md";
import Link from "next/link";

const Editor = async ({ params }) => {
  const res = await fetch(
    `http://localhost:3000/api/USER/GetEditor/${params.id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-20 h-20 bg-gradient-to-br from-red-600/20 to-red-800/20 rounded-full flex items-center justify-center mb-6 border border-red-500/30 mx-auto">
            <FiUser size={32} className="text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-white/90 mb-2">
            Editor Not Found
          </h2>
          <p className="text-white/60 mb-6">
            The editor you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/Editor-List"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-700 text-white rounded-xl hover:from-purple-500 hover:to-violet-600 transition-all duration-300 font-medium shadow-lg hover:shadow-purple-500/25"
          >
            <FiArrowLeft className="mr-2" />
            Back to Editors
          </Link>
        </motion.div>
      </div>
    );
  }

  const data = await res.json();
  const user = data.editor;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const avatarVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

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

      <div className="relative z-10 flex items-center justify-center px-4 py-16 min-h-screen">
        <motion.div
          className="w-full max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Back Button */}
          <motion.div className="mb-8" variants={itemVariants}>
            <Link
              href="/Editor-List"
              className="inline-flex items-center text-purple-300 hover:text-purple-200 transition-colors duration-300 group"
            >
              <motion.div whileHover={{ x: -4 }} transition={{ duration: 0.2 }}>
                <FiArrowLeft className="mr-2" />
              </motion.div>
              <span className="font-medium">Back to Editors</span>
            </Link>
          </motion.div>

          {/* Main Card */}
          <motion.div
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
            variants={itemVariants}
          >
            {/* Card Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-violet-500/10 rounded-3xl" />

            {/* Content */}
            <div className="relative z-10 text-center space-y-8">
              {/* Avatar Section */}
              <motion.div
                className="relative inline-block"
                variants={avatarVariants}
              >
                <div className="relative">
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-violet-500/30 rounded-full blur-xl animate-pulse" />

                  {/* Main Avatar */}
                  <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full bg-gradient-to-br from-purple-600/30 to-violet-600/30 border-4 border-purple-400/50 shadow-2xl flex items-center justify-center text-white backdrop-blur-sm">
                    <span className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-purple-200 to-white bg-clip-text text-transparent">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>

                  {/* Status Indicator */}
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full border-4 border-black/50 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  </div>
                </div>
              </motion.div>

              {/* Name and Title */}
              <motion.div variants={itemVariants} className="space-y-3">
                <div className="flex items-center justify-center gap-3">
                  <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-200 via-white to-purple-200 bg-clip-text text-transparent">
                    {user.name}
                  </h1>
                  <MdVerified className="text-purple-400 text-2xl" />
                </div>

                <div className="flex items-center justify-center gap-2">
                  <FiEdit3 className="text-purple-400" />
                  <span className="text-white/80 text-lg">
                    Professional Video Editor
                  </span>
                </div>
              </motion.div>

              {/* Role Badge */}
              <motion.div variants={itemVariants}>
                <span className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600/80 to-violet-600/80 text-white rounded-2xl text-sm font-semibold uppercase tracking-wider border border-purple-400/30 backdrop-blur-sm shadow-lg">
                  <FiStar className="mr-2" />
                  {user.role}
                </span>
              </motion.div>

              {/* Contact Information */}
              <motion.div variants={itemVariants} className="space-y-4">
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <FiMail className="text-purple-400" />
                    <span className="text-white/60 text-sm font-medium uppercase tracking-wide">
                      Contact
                    </span>
                  </div>
                  <a
                    href={`mailto:${user.email}?subject=Video Editing Inquiry`}
                    className="text-purple-300 hover:text-purple-200 transition-colors duration-300 font-medium text-lg group"
                  >
                    <span className="group-hover:underline">{user.email}</span>
                  </a>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
              >
                <a
                  href={`mailto:${user.email}?subject=Video Editing Project Inquiry`}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-violet-700 text-white rounded-2xl hover:from-purple-500 hover:to-violet-600 transition-all duration-300 font-semibold shadow-xl hover:shadow-purple-500/25 flex items-center justify-center group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    <FiMail className="mr-2 group-hover:rotate-12 transition-transform duration-300" />
                    Send Message
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                </a>

                <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl transition-all duration-300 font-semibold border border-white/20 hover:border-purple-400/50 backdrop-blur-sm flex items-center justify-center group">
                  <FiCamera className="mr-2 group-hover:scale-110 transition-transform duration-300" />
                  View Portfolio
                </button>
              </motion.div>

              {/* Stats Section */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-3 gap-4 pt-8"
              >
                <div className="text-center p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-purple-300">150+</div>
                  <div className="text-white/60 text-sm">Projects</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-purple-300">4.9★</div>
                  <div className="text-white/60 text-sm">Rating</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-purple-300">
                    2+ yrs
                  </div>
                  <div className="text-white/60 text-sm">Experience</div>
                </div>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-2xl" />
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-tr from-violet-500/10 to-transparent rounded-full blur-2xl" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Editor;
