"use client";

import { FaQuoteLeft } from "react-icons/fa";

const accentColors = {
  purple: {
    from: "from-purple-700",
    to: "to-violet-800",
    shadow: "shadow-lg shadow-purple-500/20",
    hoverShadow: "hover:shadow-xl hover:shadow-purple-500/40",
    textLight: "text-purple-400",
    textMedium: "text-purple-300",
    border: "border-purple-500",
    hoverBorder: "hover:border-purple-400",
    bgGradient: "bg-gradient-to-br from-purple-900/40 to-violet-900/30",
  },
  blue: {
    from: "from-blue-700",
    to: "to-indigo-800",
    shadow: "shadow-lg shadow-blue-500/20",
    hoverShadow: "hover:shadow-xl hover:shadow-blue-500/40",
    textLight: "text-blue-400",
    textMedium: "text-blue-300",
    border: "border-blue-500",
    hoverBorder: "hover:border-blue-400",
    bgGradient: "bg-gradient-to-br from-blue-900/40 to-indigo-900/30",
  },
  pink: {
    from: "from-pink-700",
    to: "to-rose-800",
    shadow: "shadow-lg shadow-pink-500/20",
    hoverShadow: "hover:shadow-xl hover:shadow-pink-500/40",
    textLight: "text-pink-400",
    textMedium: "text-pink-300",
    border: "border-pink-500",
    hoverBorder: "hover:border-pink-400",
    bgGradient: "bg-gradient-to-br from-pink-900/40 to-rose-900/30",
  },
};

export default function Testimonials() {
  const testimonials = [
    {
      name: "Ananya Verma",
      role: "Lifestyle Influencer",
      quote:
        "This platform made my YouTube uploads 5x faster. I just review and authenticate — my editor handles the rest. Absolute game changer!",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      color: "purple",
    },
    {
      name: "Ravi Mehra",
      role: "Freelance Video Editor",
      quote:
        "I landed 3 long-term clients by showcasing my edits here. Posting directly to their channel builds instant trust!",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      color: "purple",
    },
    {
      name: "TechBro Amit",
      role: "Tech YouTuber",
      quote:
        "No more downloading, compressing, or scheduling — now I focus on content while my editor posts directly to YouTube!",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      color: "purple",
    },
  ];

  const handleImageError = (e, name) => {
    e.target.src = `https://ui-avatars.com/api/?name=${name.replace(
      " ",
      "+"
    )}&background=random&color=fff&size=128`;
  };

  return (
    <section
      id="testimonials"
      className="relative bg-gradient-to-b from-black to-black min-h-screen flex flex-col items-center px-4 sm:px-8 py-12 md:py-16 lg:py-20 text-gray-300 overflow-hidden"
    >
      {/* Background Glow Effects */}
      <div className="absolute inset-0 overflow-hidden opacity-30 -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-purple-700/30 blur-[100px] sm:blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-violet-900/30 blur-[100px] sm:blur-[120px]" />
        <div className="absolute top-3/4 left-1/2 w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-blue-900/20 blur-[80px] sm:blur-[100px]" />
      </div>

      <div className="text-center mb-10 md:mb-14 lg:mb-16 max-w-3xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl md:text-[2.5rem] font-bold bg-gradient-to-r from-purple-500 via-violet-400 to-white bg-clip-text text-transparent mb-3 sm:mb-4">
          Trusted by Creators Worldwide
        </h2>
        <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
          Join thousands of content creators who've transformed their workflow
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl w-full px-4">
        {testimonials.map((t, i) => {
          const color = t.color || "purple";
          const tColors = accentColors[color] || accentColors.purple;

          return (
            <div
              key={i}
              className={`relative ${tColors.bgGradient} border ${tColors.border} rounded-xl sm:rounded-2xl p-6 sm:p-8 ${tColors.shadow} ${tColors.hoverShadow} ${tColors.hoverBorder}
                transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 backdrop-blur-lg flex flex-col items-center text-center h-full
                group hover:bg-opacity-50`}
            >
              {/* Profile image with gradient border */}
              <div
                className={`relative mb-5 sm:mb-6 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br ${tColors.from} ${tColors.to} p-1 
                  group-hover:scale-105 transition-transform duration-300`}
              >
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-full h-full rounded-full object-cover border-2 border-gray-900"
                  onError={(e) => handleImageError(e, t.name)}
                />
              </div>

              <FaQuoteLeft
                className={`${tColors.textLight} text-2xl sm:text-3xl mb-3 sm:mb-4 opacity-80 group-hover:opacity-100 transition-opacity`}
              />
              <p className="text-gray-200 text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed font-medium">
                "{t.quote}"
              </p>

              <div className="mt-auto">
                <h3 className="text-white text-lg sm:text-xl font-bold mb-1 group-hover:text-white/90 transition-colors">
                  {t.name}
                </h3>
                <p
                  className={`${tColors.textMedium} text-xs sm:text-sm font-medium group-hover:${tColors.textLight} transition-colors`}
                >
                  {t.role}
                </p>
              </div>

              {/* Decorative corner elements */}
              <div
                className={`absolute top-0 left-0 w-5 h-5 sm:w-6 sm:h-6 border-t-2 border-l-2 ${tColors.border} rounded-tl-lg sm:rounded-tl-xl opacity-50 
                  group-hover:opacity-80 transition-opacity`}
              ></div>
              <div
                className={`absolute bottom-0 right-0 w-5 h-5 sm:w-6 sm:h-6 border-b-2 border-r-2 ${tColors.border} rounded-br-lg sm:rounded-br-xl opacity-50 
                  group-hover:opacity-80 transition-opacity`}
              ></div>
            </div>
          );
        })}
      </div>

      {/* Floating decorative elements */}
      <div className="absolute bottom-8 sm:bottom-10 left-8 sm:left-10 w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-purple-500/20"></div>
      <div className="absolute top-16 sm:top-20 right-16 sm:right-20 w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-blue-500/10"></div>
      <div className="absolute top-1/2 left-1/3 w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-pink-500/15"></div>
    </section>
  );
}
