"use client";
import { SiSharex } from "react-icons/si";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/authContext";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const { user, setUser } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsOpen(false);
    router.push("/Login");
  };

  const renderUserLinks = () => {
    if (!user) return null;

    const commonLinks = [
      {
        label: "Dashboard",
        href: "/Dashboard/IncomingVideoUpload",
        icon: "📊",
      },
      {
        label: "Pricing",
        href: "/#pricing",
        icon: "💰",
      },
    ];

    const roleLinks =
      user.role === "editor"
        ? [
            {
              label: "My User",
              href: "/My User",
              icon: "👤",
            },
            {
              label: "All Users",
              href: "/User-List",
              icon: "👥",
            },
          ]
        : [
            {
              label: "My Editor",
              href: "/My Editor",
              icon: "✂️",
            },
            {
              label: "All Editors",
              href: "/Editor-List",
              icon: "👥",
            },
          ];

    return [...roleLinks, ...commonLinks];
  };

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const linkVariants = {
    rest: { scale: 1, y: 0 },
    hover: {
      scale: 1.02,
      y: -1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const iconVariants = {
    rest: { rotate: 0, scale: 1 },
    hover: {
      rotate: 360,
      scale: 1.1,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const mobileItemVariants = {
    closed: { x: -50, opacity: 0 },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 w-full z-50 h-20 flex items-center justify-between px-8 md:px-16 backdrop-blur-xl transition-all duration-500 ${
          scrolled
            ? "bg-black/98 border-b border-purple-500/20 shadow-2xl shadow-purple-500/5"
            : "bg-black/90 border-b border-white/5"
        }`}
        variants={navVariants}
        initial="hidden"
        animate="visible"
        style={{
          backdropFilter: "blur(20px) saturate(180%)",
        }}
      >
        {/* Elegant gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-violet-900/10 pointer-events-none" />

        {/* Logo with enhanced elegance */}
        <Link href="/" className="flex items-center gap-3 group z-50 relative">
          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-purple-500/20 rounded-full blur-lg"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              variants={iconVariants}
              initial="rest"
              whileHover="hover"
              className="relative z-10 p-2 rounded-xl bg-gradient-to-br from-purple-600/20 to-violet-600/20 border border-purple-500/30"
            >
              <SiSharex
                className="text-purple-400 group-hover:text-purple-300 transition-all duration-500 drop-shadow-lg"
                size={28}
              />
            </motion.div>
          </div>
          <motion.span
            className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-300 via-violet-300 to-purple-600 bg-clip-text text-transparent tracking-tight"
            whileHover={{
              backgroundPosition: "200% center",
              transition: { duration: 0.8 },
            }}
            style={{
              backgroundSize: "200% 100%",
              textShadow: "0 0 30px rgba(147, 51, 234, 0.3)",
            }}
          >
            TubeGate
          </motion.span>
        </Link>

        {/* Desktop Menu with enhanced elegance */}
        <ul className="hidden md:flex space-x-2 items-center">
          {!user ? (
            <>
              <motion.li
                variants={linkVariants}
                initial="rest"
                whileHover="hover"
              >
                <Link
                  href="/Register"
                  className="relative text-white/90 hover:text-white transition-all duration-500 text-sm md:text-base font-medium px-6 py-3 rounded-xl backdrop-blur-sm border border-white/10 hover:border-purple-400/50 hover:bg-white/5 group overflow-hidden"
                >
                  <span className="relative z-10">Register</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-violet-500/0 group-hover:from-purple-500/10 group-hover:to-violet-500/10 transition-all duration-500" />
                </Link>
              </motion.li>
              <motion.li
                variants={linkVariants}
                initial="rest"
                whileHover="hover"
              >
                <Link
                  href="/Login"
                  className="relative px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-purple-700 to-violet-800 text-white hover:from-purple-500 hover:via-purple-600 hover:to-violet-700 transition-all duration-500 shadow-xl hover:shadow-purple-500/25 font-medium text-sm md:text-base flex items-center group overflow-hidden border border-purple-500/50"
                >
                  <span className="relative z-10 flex items-center">
                    Login
                    <IoMdNotificationsOutline className="ml-2 group-hover:rotate-12 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                </Link>
              </motion.li>
            </>
          ) : (
            <>
              {renderUserLinks().map((link) => (
                <motion.li
                  key={link.label}
                  variants={linkVariants}
                  initial="rest"
                  whileHover="hover"
                >
                  <Link
                    href={link.href}
                    className="relative text-white/90 hover:text-purple-300 font-medium transition-all duration-500 flex items-center px-4 py-3 text-sm rounded-xl hover:bg-white/5 border border-transparent hover:border-purple-500/30 backdrop-blur-sm group overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center">
                      <span className="mr-3 text-lg group-hover:scale-110 transition-transform duration-300">
                        {link.icon}
                      </span>
                      {link.label}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-violet-500/0 group-hover:from-purple-500/10 group-hover:to-violet-500/10 transition-all duration-500" />
                  </Link>
                </motion.li>
              ))}
              <motion.li
                variants={linkVariants}
                initial="rest"
                whileHover="hover"
              >
                <button
                  onClick={handleLogout}
                  className="relative px-4 py-3 rounded-xl bg-red-900/20 hover:bg-red-800/30 text-red-400 hover:text-red-300 transition-all duration-500 font-medium text-sm md:text-base flex items-center border border-red-800/30 hover:border-red-600/50 group overflow-hidden backdrop-blur-sm"
                >
                  <span className="relative z-10 flex items-center">
                    <FiLogOut className="mr-2 group-hover:rotate-12 transition-transform duration-300" />
                    Logout
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 to-red-400/0 group-hover:from-red-500/10 group-hover:to-red-400/10 transition-all duration-500" />
                </button>
              </motion.li>
            </>
          )}
        </ul>

        {/* Enhanced Mobile Menu Button */}
        <motion.button
          className="md:hidden text-purple-400 hover:text-purple-300 focus:outline-none z-50 p-3 rounded-xl backdrop-blur-sm border border-purple-500/30 hover:border-purple-400/50 hover:bg-white/5 transition-all duration-300"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </motion.div>
        </motion.button>
      </motion.nav>

      {/* Enhanced Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 pt-24 px-6"
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,0,0,0.98) 0%, rgba(31,41,55,0.98) 50%, rgba(0,0,0,0.98) 100%)",
              backdropFilter: "blur(20px) saturate(180%)",
            }}
          >
            {/* Elegant background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
              <div
                className="absolute top-3/4 right-1/4 w-96 h-96 bg-violet-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
                style={{ animationDelay: "2s" }}
              />
            </div>

            <motion.ul
              className="flex flex-col space-y-6 items-center relative z-10 mt-12"
              variants={mobileMenuVariants}
            >
              {!user ? (
                <>
                  <motion.li variants={mobileItemVariants}>
                    <Link
                      href="/Register"
                      className="relative text-xl text-white/95 hover:text-purple-300 transition-all duration-500 font-medium px-8 py-4 rounded-2xl hover:bg-white/5 w-full text-center block border border-white/10 hover:border-purple-400/50 backdrop-blur-sm group overflow-hidden"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="relative z-10">Register</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-violet-500/0 group-hover:from-purple-500/10 group-hover:to-violet-500/10 transition-all duration-500" />
                    </Link>
                  </motion.li>
                  <motion.li variants={mobileItemVariants}>
                    <Link
                      href="/Login"
                      className="relative px-10 py-4 text-xl rounded-2xl bg-gradient-to-r from-purple-600 via-purple-700 to-violet-800 text-white hover:from-purple-500 hover:via-purple-600 hover:to-violet-700 transition-all duration-500 shadow-2xl hover:shadow-purple-500/25 font-medium flex items-center justify-center group overflow-hidden border border-purple-500/50"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="relative z-10 flex items-center">
                        <IoMdNotificationsOutline className="mr-3 group-hover:rotate-12 transition-transform duration-300" />
                        Login
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                    </Link>
                  </motion.li>
                </>
              ) : (
                <>
                  {renderUserLinks().map((link, index) => (
                    <motion.li key={link.label} variants={mobileItemVariants}>
                      <Link
                        href={link.href}
                        className="relative text-xl text-white/95 hover:text-purple-300 transition-all duration-500 font-medium px-8 py-4 rounded-2xl hover:bg-white/5 w-full text-center flex items-center justify-center border border-white/10 hover:border-purple-400/50 backdrop-blur-sm group overflow-hidden"
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="relative z-10 flex items-center">
                          <span className="mr-4 text-2xl group-hover:scale-110 transition-transform duration-300">
                            {link.icon}
                          </span>
                          {link.label}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-violet-500/0 group-hover:from-purple-500/10 group-hover:to-violet-500/10 transition-all duration-500" />
                      </Link>
                    </motion.li>
                  ))}
                  <motion.li variants={mobileItemVariants}>
                    <button
                      onClick={handleLogout}
                      className="relative px-10 py-4 text-xl rounded-2xl bg-red-900/20 hover:bg-red-800/30 text-red-400 hover:text-red-300 transition-all duration-500 font-medium flex items-center justify-center border border-red-800/30 hover:border-red-600/50 group overflow-hidden backdrop-blur-sm"
                    >
                      <span className="relative z-10 flex items-center">
                        <FiLogOut className="mr-4 group-hover:rotate-12 transition-transform duration-300" />
                        Logout
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 to-red-400/0 group-hover:from-red-500/10 group-hover:to-red-400/10 transition-all duration-500" />
                    </button>
                  </motion.li>
                </>
              )}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
