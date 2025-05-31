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
      "You can reach our support team via the Contact Us page or by emailing support@example.com.",
  },
];

export default function FAQs() {
  return (
    <section id="faq" className="max-w-4xl mx-auto px-6 md:px-0 py-16">
      <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-white bg-clip-text text-transparent mb-12 text-center">
        Frequently Asked <span className="text-white">Questions</span>
      </h2>

      <div className="space-y-4">
        {faqs.map(({ question, answer }, i) => (
          <FAQItem key={i} question={question} answer={answer} />
        ))}
      </div>
    </section>
  );
}

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="bg-gray-800 bg-opacity-30 rounded-xl border border-gray-700 p-5 cursor-pointer select-none"
      onClick={() => setOpen(!open)}
      aria-expanded={open}
      aria-controls={`faq-answer-${question}`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg md:text-xl font-semibold text-white">
          {question}
        </h3>
        <div className="text-purple-400">
          {open ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
        </div>
      </div>

      {open && (
        <p
          id={`faq-answer-${question}`}
          className="mt-3 text-gray-300 text-base md:text-lg leading-relaxed"
        >
          {answer}
        </p>
      )}
    </div>
  );
}
