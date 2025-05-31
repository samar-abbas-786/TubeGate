"use client";

import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "How do I sign up?",
    answer:
      "Signing up is simple! Just click the Sign Up button on the top right and fill out the registration form.",
  },
  {
    question: "Can I change my subscription plan later?",
    answer:
      "Yes, you can upgrade or downgrade your subscription anytime from your account settings.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely! We use industry-standard encryption and security protocols to protect your data.",
  },
  {
    question: "How do I contact support?",
    answer:
      "You can reach our support team via the Contact Us page or by emailing syedsamar405@gmail.com.",
  },
];

export default function FAQs() {
  return (
    <section
      id="faq"
      className="relative bg-gradient-to-b from-black to-black min-h-screen flex flex-col items-center px-6 md:px-12 py-16 text-gray-300 overflow-hidden"
    >
      {/* Background Blur Pulses */}
      <div className="absolute inset-0 overflow-hidden opacity-20 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-purple-700/30 blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-purple-900/30 blur-[120px] animate-pulse delay-300" />
      </div>

      <h2 className="p-2 text-3xl sm:text-4xl md:text-[2.5rem] font-extrabold bg-gradient-to-r from-purple-400 to-white bg-clip-text text-transparent mb-10 text-center max-w-4xl">
        Frequently Asked <span className="text-white">Questions</span>
      </h2>

      <div className="max-w-4xl w-full divide-y divide-purple-800">
        {faqs.map((faq, index) => (
          <FAQItem key={index} {...faq} />
        ))}
      </div>
    </section>
  );
}

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="py-6">
      <button
        className="w-full flex justify-between items-center text-left group"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="text-white text-lg md:text-xl font-semibold transition duration-300 group-hover:text-purple-400">
          {question}
        </span>
        <span className="text-purple-400 transition duration-300 group-hover:rotate-180">
          {open ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-40 mt-3 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-gray-300 text-base leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}
