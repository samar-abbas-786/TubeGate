"use client";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaArrowRight,
} from "react-icons/fa";
import { SiSharex } from "react-icons/si";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-black  shadow-sm shadow-purple-900 to-black text-gray-300 px-6 md:px-12 py-16 overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 overflow-hidden opacity-30 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-700/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-violet-900/20 rounded-full blur-[120px] animate-pulse delay-300" />
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-blue-900/10 rounded-full blur-[100px] animate-pulse delay-500" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand section - enhanced */}
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2 group z-50 w-fit">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <SiSharex
                className="text-purple-500 group-hover:text-purple-300 transition-all duration-300"
                size={32}
              />
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-violet-400 to-purple-800 bg-clip-text text-transparent">
              TubeGate
            </span>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            Seamlessly manage your YouTube videos with our secure, creator-first
            platform.
          </p>

          {/* Newsletter signup */}
          <div className="mt-4">
            <p className="text-sm text-purple-300 mb-2">Stay updated</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-gray-800 text-white text-sm px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
              />
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 rounded-r-md transition-all">
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>

        {/* Links sections - improved */}
        <div>
          <h4 className="text-white font-semibold text-lg mb-4 pb-2 border-b border-purple-900/50 w-fit">
            Company
          </h4>
          <ul className="space-y-3">
            {["How it works", "Pricing", "FAQs", "Careers"].map((item) => (
              <motion.li
                key={item}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <a
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-1 text-sm"
                >
                  <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 transition-all" />
                  {item}
                </a>
              </motion.li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-lg mb-4 pb-2 border-b border-purple-900/50 w-fit">
            Resources
          </h4>
          <ul className="space-y-3">
            {["Blog", "Documentation", "Community", "Support"].map((item) => (
              <motion.li
                key={item}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <a
                  href="#"
                  className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-1 text-sm"
                >
                  <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 transition-all" />
                  {item}
                </a>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Social section - enhanced */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold text-lg mb-4 pb-2 border-b border-purple-900/50 w-fit">
            Connect
          </h4>
          <div className="flex space-x-4 mb-6">
            {[
              { icon: <FaFacebookF />, color: "text-blue-400" },
              { icon: <FaTwitter />, color: "text-sky-400" },
              { icon: <FaLinkedinIn />, color: "text-blue-500" },
              { icon: <FaYoutube />, color: "text-red-500" },
            ].map((social, index) => (
              <motion.a
                key={index}
                href="#"
                className={`${social.color} hover:text-white transition-all p-2 rounded-full bg-gray-800 hover:bg-gradient-to-br from-purple-900/30 to-transparent`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>

          {/* Contact info */}
          <div className="text-sm space-y-2 text-gray-400">
            <p>syedsamar405@gmail.com</p>
            <p>+91 9997405528</p>
            <p>247656,manglaur,haridwar,uttrakhand,india</p>
          </div>
        </div>
      </div>

      {/* Copyright section - improved */}
      <div className="border-t border-purple-900/30 mt-16 pt-8 text-sm text-center text-gray-500 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} Tubegate. All rights reserved.
        </div>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-purple-400 transition">
            Privacy Policy
          </a>
          <a href="/Terms" className="hover:text-purple-400 transition">
            Terms of Service
          </a>
          <a href="#" className="hover:text-purple-400 transition">
            Cookies
          </a>
        </div>
      </div>
    </footer>
  );
}
