"use client";
import { SiSharex } from "react-icons/si";
import { FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
  }, []);

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="sticky top-0 z-50 h-16 flex items-center justify-between px-6 md:px-12 backdrop-blur-md bg-black border-b border-purple-900/30 shadow-purple-500 shadow-xs">
        {/* Logo with glow effect */}
        <Link href="/" className="flex items-center gap-2 group z-50">
          <SiSharex
            className="text-purple-500 group-hover:text-purple-300 transition-all duration-300 transform group-hover:scale-110"
            size={28}
          />
          <span className="text-2xl font-bold font-mono bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            TubeGate
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex space-x-6 md:space-x-8">
          <li>
            <Link
              href="/Register"
              className="relative text-white/90 hover:text-white transition-all duration-300 text-sm md:text-base font-medium"
            >
              <span className="relative group">
                Register
                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-purple-400 transition-all duration-300 group-hover:w-full" />
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/Login"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 text-white hover:from-purple-700 hover:to-purple-900 transition-all duration-300 shadow-lg hover:shadow-purple-500/20 font-medium text-sm md:text-base"
            >
              Login
            </Link>
          </li>
        </ul>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-purple-400 focus:outline-none z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black/95 z-40 pt-20 px-6 transition-all duration-300 ease-in-out ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <ul className="flex flex-col space-y-8 items-center mt-10">
          <li>
            <Link
              href="/Register"
              className="text-2xl text-white/90 hover:text-purple-400 transition-all duration-300 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Register
            </Link>
          </li>
          <li>
            <Link
              href="/Login"
              className="px-8 py-3 text-xl rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 text-white hover:from-purple-700 hover:to-purple-900 transition-all duration-300 shadow-lg hover:shadow-purple-500/20 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
