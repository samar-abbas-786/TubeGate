"use client";
import { FaCheck } from "react-icons/fa";

const plans = [
  {
    name: "Starter",
    price: "Free",
    features: [
      "Upload up to 5 videos/month",
      "Basic analytics",
      "Google Sign-in",
    ],
    highlight: false,
  },
  {
    name: "Pro",
    price: "$9.99/mo",
    features: [
      "Unlimited uploads",
      "Advanced analytics",
      "Custom thumbnails",
      "Priority support",
    ],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Contact Us",
    features: [
      "Dedicated account manager",
      "Team access",
      "Custom integrations",
      "24/7 premium support",
    ],
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="relative bg-gradient-to-b from-black to-black min-h-screen px-6 md:px-12 py-20 text-gray-300 flex flex-col items-center overflow-hidden"
    >
      {/* Blur background pulses */}
      <div className="absolute inset-0 overflow-hidden opacity-20 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-700/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-900/30 rounded-full blur-[120px] animate-pulse delay-300" />
      </div>

      <h2 className="text-4xl md:text-[2.7rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-white text-center mb-8">
        Choose Your Plan
      </h2>
      <p className="text-gray-400 max-w-xl text-center mb-16">
        Whether you're just starting out or need enterprise-level tools,
        TubeGate has a plan for you.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-6xl">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`rounded-2xl p-8 shadow-xl border ${
              plan.highlight
                ? "bg-purple-800/40 border-purple-500 scale-105"
                : "bg-purple-900/20 border-purple-800"
            } transition-transform duration-300 hover:scale-105`}
          >
            <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
            <p className="text-3xl font-extrabold text-purple-400 mb-6">
              {plan.price}
            </p>
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center text-gray-300">
                  <FaCheck className="text-purple-400 mr-3" />
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className={`w-full py-3 rounded-xl text-sm font-semibold transition duration-300 ${
                plan.highlight
                  ? "bg-white text-black hover:bg-gray-200"
                  : "bg-purple-700 text-white hover:bg-purple-600"
              }`}
            >
              {plan.price === "Contact Us" ? "Get in Touch" : "Choose Plan"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
