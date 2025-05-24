import { SiSharex } from "react-icons/si";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 h-16 flex items-center justify-between px-6 md:px-12 backdrop-blur-md bg-black border-b border-purple-900/30 shadow-lg">
      {/* Logo with glow effect */}
      <Link href="/" className="flex items-center gap-2 group">
        <SiSharex
          className="text-purple-500 group-hover:text-purple-300 transition-all duration-300 transform group-hover:scale-110"
          size={28}
        />
        <span className="text-2xl font-bold font-mono bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
          TubeGate
        </span>
      </Link>

      {/* Navigation Links with underline animation */}
      <ul className="flex space-x-6 md:space-x-8">
        <li>
          <Link
            href="/register"
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
            href="/login"
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 text-white hover:from-purple-700 hover:to-purple-900 transition-all duration-300 shadow-lg hover:shadow-purple-500/20 font-medium text-sm md:text-base"
          >
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
