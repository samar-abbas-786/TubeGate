import { FaQuoteLeft } from "react-icons/fa";

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative bg-gradient-to-b from-black to-black min-h-screen flex flex-col items-center px-6 md:px-12 py-16 text-gray-300 overflow-hidden"
    >
      {/* Background Glow Effects */}
      <div className="absolute inset-0 overflow-hidden opacity-20 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-purple-700/30 blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-violet-900/30 blur-[120px] animate-pulse delay-200" />
      </div>

      <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-400 to-white bg-clip-text text-transparent mb-12 text-center">
        What Our Users Say
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl w-full">
        <TestimonialCard
          name="Ananya Verma"
          role="Lifestyle Influencer"
          quote="This platform made my YouTube uploads 5x faster. I just review and authenticate — my editor handles the rest. Absolute game changer!"
        />

        <TestimonialCard
          name="Ravi Mehra"
          role="Freelance Video Editor"
          quote="I landed 3 long-term clients by showcasing my edits here. Posting directly to their channel builds instant trust!"
        />

        <TestimonialCard
          name="TechBro Amit"
          role="Tech YouTuber"
          quote="No more downloading, compressing, or scheduling — now I focus on content while my editor posts directly to YouTube!"
        />
      </div>
    </section>
  );
}

function TestimonialCard({ name, role, quote }) {
  return (
    <div className="bg-purple-900/30 p-6 rounded-2xl text-center shadow-xl hover:bg-purple-800/40 transition duration-300">
      <FaQuoteLeft className="text-violet-400 text-3xl mx-auto mb-4" />
      <p className="text-gray-200 italic mb-6">"{quote}"</p>
      <h3 className="text-white text-xl font-semibold">{name}</h3>
      <p className="text-violet-300 text-sm">{role}</p>
    </div>
  );
}
