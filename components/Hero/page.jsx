"use client";
import React, { useState, useEffect } from "react";
import {
  Play,
  Rocket,
  ArrowRight,
  Star,
  Shield,
  CheckCircle,
  Youtube,
} from "lucide-react";

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen bg-black overflow-hidden pt-24">
      {/* Dynamic mesh gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-black to-rose-900/20" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15), transparent 40%)`,
          }}
        />
      </div>

      {/* Animated geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "4s" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-600/10 to-blue-600/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "6s", animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-emerald-600/10 to-teal-600/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "5s", animationDelay: "1s" }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Grid overlay with glassmorphism */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div
        className={`relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="max-w-7xl mx-auto text-center">
          {/* Floating badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 backdrop-blur-sm border border-violet-500/30 mb-8 hover:scale-105 transition-transform duration-300">
            <Star className="text-yellow-400 w-4 h-4 animate-pulse" />
            <span className="text-sm text-gray-300 font-medium">
              Trusted by 10,000+ Creators
            </span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </div>

          {/* Revolutionary main heading */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center justify-center gap-6 mb-6">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-red-600 to-red-400 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
                <Youtube className="relative text-red-500 w-16 h-16 md:w-20 md:h-20 drop-shadow-2xl hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex w-full justify-center">
              <h1 className="text-4xl md:text-8xl lg:text-6xl flex gap-5 text-center font-black leading-none">
                <span className="block bg-gradient-to-r from-white via-violet-200 to-fuchsia-200 bg-clip-text text-transparent drop-shadow-sm">
                  Content
                </span>
                <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                  Revolution
                </span>
              </h1>
            </div>
            <div className="flex items-center justify-center gap-3 mt-6">
              <div className="h-1 w-12 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full" />
              <div className="h-1 w-8 bg-gradient-to-r from-fuchsia-500 to-cyan-500 rounded-full" />
              <div className="h-1 w-4 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full" />
            </div>
          </div>

          {/* Enhanced description */}
          <p className="text-xl md:text-2xl text-gray-300 max-w-5xl mx-auto mb-12 leading-relaxed font-light">
            Experience the future of content management with
            <span className="font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              {" "}
              AI-powered workflows
            </span>
            ,
            <span className="font-bold bg-gradient-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              {" "}
              instant approvals
            </span>
            , and
            <span className="font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              {" "}
              seamless YouTube integration
            </span>
            .
          </p>

          {/* CTA buttons with advanced effects */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <button className="group relative px-10 py-5 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 text-white font-bold text-lg overflow-hidden hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-violet-500/25">
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative flex items-center gap-3">
                <Rocket className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                Start Creating Magic
                <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
              </span>
            </button>

            <button className="group px-10 py-5 rounded-2xl bg-black/40 backdrop-blur-sm border-2 border-violet-500/30 text-violet-300 hover:text-white font-bold text-lg transition-all duration-300 hover:border-violet-500/60 hover:bg-violet-900/20">
              <span className="flex items-center gap-3">
                <Play className="w-5 h-5 text-violet-400 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
                Watch Demo
                <div className="w-0 h-0.5 bg-violet-400 group-hover:w-8 transition-all duration-500" />
              </span>
            </button>
          </div>

          {/* Enhanced stats with glassmorphism */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
            {[
              {
                value: "500K+",
                label: "Videos Processed",
                icon: Youtube,
                gradient: "from-red-400 to-rose-400",
              },
              {
                value: "99.9%",
                label: "Uptime Guarantee",
                icon: Shield,
                gradient: "from-emerald-400 to-teal-400",
              },
              {
                value: "< 30s",
                label: "Approval Time",
                icon: CheckCircle,
                gradient: "from-violet-400 to-fuchsia-400",
              },
              {
                value: "24/7",
                label: "AI Monitoring",
                icon: Rocket,
                gradient: "from-cyan-400 to-blue-400",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="group relative p-8 bg-black/20 backdrop-blur-sm border border-white/10 rounded-3xl hover:border-violet-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-violet-500/10"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-fuchsia-600/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <stat.icon
                    className={`w-8 h-8 mb-4 bg-gradient-to-r ${stat.gradient} text-white mx-auto`}
                  />
                  <p
                    className={`text-4xl md:text-5xl font-black mb-3 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
                  >
                    {stat.value}
                  </p>
                  <p className="text-gray-400 text-sm font-medium">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Trust indicators with enhanced styling */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-gray-500 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>Enterprise Security</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span>SOC 2 Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              <span>GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
              <span>99.9% SLA</span>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500">
            <span className="text-xs font-medium">Scroll to explore</span>
            <div className="w-0.5 h-8 bg-gradient-to-b from-violet-500 to-transparent animate-pulse" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
