"use client";
import { SiSharex } from "react-icons/si";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/authContext";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

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
        href: "/Dashboard",
        icon: <SiSharex className="mr-2" />,
      },
    ];

    const roleLinks =
      user.role === "editor"
        ? [
            {
              label: "My User",
              href: "/My User",
              icon: <IoMdNotificationsOutline className="mr-2" />,
            },
            {
              label: "All User",
              href: "/User-List",
              icon: <SiSharex className="mr-2" />,
            },
          ]
        : [
            {
              label: "My Editor",
              href: "/My Editor",
              icon: <IoMdNotificationsOutline className="mr-2" />,
            },
            {
              label: "All Editor",
              href: "/Editor-List",
              icon: <SiSharex className="mr-2" />,
            },
          ];

    return [...roleLinks, ...commonLinks];
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 w-full z-50 h-16 flex items-center justify-between px-6 md:px-12 backdrop-blur-md transition-all duration-300 ${
          scrolled
            ? "bg-black/90 border-b border-purple-900/30 shadow-lg shadow-purple-500/10"
            : "bg-black/50 border-b border-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link href="/" className="flex items-center gap-2 group z-50">
          <motion.div whileHover={{ scale: 1.1 }}>
            <SiSharex
              className="text-purple-500 group-hover:text-purple-300 transition-all duration-300"
              size={28}
            />
          </motion.div>
          <span className="text-2xl font-bold font-mono bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            TubeGate
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 md:space-x-8 items-center">
          {!user ? (
            <>
              <motion.li whileHover={{ y: -2 }}>
                <Link
                  href="/Register"
                  className="text-white/80 hover:text-white transition-all duration-300 text-sm md:text-base font-medium hover:bg-white/5 px-4 py-2 rounded-lg"
                >
                  Register
                </Link>
              </motion.li>
              <motion.li whileHover={{ scale: 1.05 }}>
                <Link
                  href="/Login"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 text-white hover:from-purple-700 hover:to-purple-900 transition-all duration-300 shadow-lg hover:shadow-purple-500/30 font-medium text-sm md:text-base flex items-center"
                >
                  Login
                  <IoMdNotificationsOutline className="ml-2" />
                </Link>
              </motion.li>
            </>
          ) : (
            <>
              {renderUserLinks().map((link) => (
                <motion.li key={link.label} whileHover={{ y: -2 }}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-purple-300 font-medium transition flex items-center px-3 py-2 rounded-lg hover:bg-white/5"
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li whileHover={{ scale: 1.05 }}>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-red-900/30 hover:bg-red-900/50 text-red-400 hover:text-red-300 transition-all duration-300 font-medium text-sm md:text-base flex items-center"
                >
                  <FiLogOut className="mr-2" />
                  Logout
                </button>
              </motion.li>
            </>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden text-purple-400 focus:outline-none z-50 p-2 rounded-full hover:bg-white/10"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </motion.button>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-40 pt-20 px-6"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "spring", damping: 25 }}
          >
            <ul className="flex flex-col space-y-6 items-center">
              {!user ? (
                <>
                  <motion.li
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Link
                      href="/Register"
                      className="text-2xl text-white/90 hover:text-purple-400 transition font-medium px-6 py-3 rounded-lg hover:bg-white/5 w-full text-center block"
                      onClick={() => setIsOpen(false)}
                    >
                      Register
                    </Link>
                  </motion.li>
                  <motion.li
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Link
                      href="/Login"
                      className="px-8 py-3 text-xl rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 text-white hover:from-purple-700 hover:to-purple-900 transition-all duration-300 shadow-lg hover:shadow-purple-500/30 font-medium flex items-center justify-center"
                      onClick={() => setIsOpen(false)}
                    >
                      <IoMdNotificationsOutline className="mr-2" />
                      Login
                    </Link>
                  </motion.li>
                </>
              ) : (
                <>
                  {renderUserLinks().map((link, index) => (
                    <motion.li
                      key={link.label}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 * (index + 1) }}
                    >
                      <Link
                        href={link.href}
                        className="text-2xl text-white/90 hover:text-purple-400 transition font-medium px-6 py-3 rounded-lg hover:bg-white/5 w-full text-center flex items-center justify-center"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.icon}
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                  <motion.li
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * (renderUserLinks().length + 1) }}
                  >
                    <button
                      onClick={handleLogout}
                      className="px-8 py-3 text-xl rounded-lg bg-red-900/30 hover:bg-red-900/50 text-red-400 hover:text-red-300 transition font-medium flex items-center justify-center"
                    >
                      <FiLogOut className="mr-2" />
                      Logout
                    </button>
                  </motion.li>
                </>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
