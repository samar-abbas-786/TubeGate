import Hero from "@components/Hero/page";
import { FaLock, FaUpload, FaLayerGroup } from "react-icons/fa";

export default function HowItWorks() {
  return (
    <>
      <Hero />
      <section
        id="how-it-works"
        className="relative bg-gradient-to-b from-black to-black min-h-screen flex flex-col items-center px-6 md:px-12 py-16 text-gray-300 overflow-hidden"
      >
        {/* Background Blur Pulses */}
        <div className="absolute inset-0 overflow-hidden opacity-20 -z-10">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-purple-700/30 blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-purple-900/30 blur-[120px] animate-pulse delay-300" />
        </div>

        <h2 className=" p-2 text-3xl sm:text-4xl md:text-[2.5rem] font-extrabold bg-gradient-to-r from-purple-400 to-white bg-clip-text text-transparent mb-10 text-center max-w-4xl">
          How TubeGate Works
        </h2>
        <p className="max-w-3xl text-center mb-16 text-base sm:text-lg text-gray-400">
          Upload, manage, and publish your YouTube videos with ease — using a
          secure and seamless workflow tailored just for you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl w-full">
          <Step
            icon={<FaLock className="text-purple-400 w-14 h-14 mx-auto mb-5" />}
            title="Secure Authentication"
            description="Sign in securely via Google OAuth to grant TubeGate permission to manage your channel without compromising your privacy."
          />

          <Step
            icon={
              <FaUpload className="text-purple-400 w-14 h-14 mx-auto mb-5" />
            }
            title="Easy Video Upload"
            description="Select your video, add a title and description, then upload directly to your YouTube channel — all from TubeGate's dashboard."
          />

          <Step
            icon={
              <FaLayerGroup className="text-purple-400 w-14 h-14 mx-auto mb-5" />
            }
            title="Manage & Monitor"
            description="Track upload status, edit details, and get insights — giving you full control over your content publishing process."
          />
        </div>
      </section>
    </>
  );
}

function Step({ icon, title, description }) {
  return (
    <div className="bg-purple-900/30  rounded-xl p-8 shadow-lg hover:bg-purple-800/50 transition duration-300 cursor-default text-center">
      {icon}
      <h3 className="text-white text-2xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}
