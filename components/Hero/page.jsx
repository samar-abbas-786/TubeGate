import { FaYoutube, FaCheckCircle, FaRocket } from "react-icons/fa";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-b from-black  to-black min-h-[90vh] flex items-center justify-center px-6 md:px-12 overflow-hidden">
      {/* Purple animated gradient background */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-700/30 blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-purple-900/30 blur-[100px] animate-pulse delay-300" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Headline with YouTube branding */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <FaYoutube className="text-red-500 text-4xl md:text-5xl" />
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-white bg-clip-text text-transparent">
            Content Approval <span className="text-white">Made Easy</span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10">
          Editors trigger posts, users verify, and content gets published to
          YouTube seamlessly.
          <br />
          <span className="text-purple-300 font-medium">
            No hassle. Full control.
          </span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/register"
            className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 text-white hover:from-purple-700 hover:to-purple-900 transition-all duration-300 shadow-lg hover:shadow-purple-500/30 font-medium flex items-center gap-2 group"
          >
            <FaRocket className="group-hover:animate-bounce" />
            Get Started
          </Link>
          <Link
            href="#how-it-works"
            className="px-8 py-3 rounded-lg bg-transparent border border-purple-600/50 text-purple-300 hover:bg-purple-900/30 hover:text-white transition-all duration-300 font-medium flex items-center gap-2"
          >
            <FaCheckCircle />
            How It Works
          </Link>
        </div>

        {/* Stats / Trust indicators */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 text-gray-400">
          <div className="text-center">
            <p className="text-3xl font-bold text-white">100+</p>
            <p>Verified Channels</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white">1M+</p>
            <p>Content Approved</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white">24/7</p>
            <p>Secure Monitoring</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
