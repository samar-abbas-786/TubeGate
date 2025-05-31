"use client";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";
const Upload = () => {
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    const videoData = JSON.parse(localStorage.getItem("VideoData"));

    setMessage("Uploading...");
    try {
      const response = await axios.post("/api/Upload", {
        title: videoData.title,
        description: videoData.description,
        privacyStatus: videoData.privacyStatus,
        url: videoData.url,
      });
      setMessage(`✅ Video uploaded! Video ID: ${response.data.videoId}`);
    } catch (error) {
      setMessage(
        `❌ Upload failed: ${error.response?.data?.error || error.message}`
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f0f0f] p-6">
      <h1 className="text-2xl font-semibold text-violet-400 mb-6 animate-pulse">
        Final Step Before Posting
      </h1>
      <button
        onClick={handleUpload}
        className="px-6 py-3 bg-gradient-to-r from-purple-700 to-violet-500 hover:from-violet-600 hover:to-purple-600 transition-all duration-300 text-white font-bold rounded-lg shadow-lg"
      >
        Are you sure you want to post this on YouTube?
      </button>
      {message && (
        <p className="mt-6 text-center text-violet-300 text-lg">{message}</p>
      )}
      <Link
        href="/"
        className="relative mt-10 px-6 py-3 rounded-lg bg-gray-900 text-purple-300 font-medium group overflow-hidden border border-transparent hover:text-white"
      >
        <span className="relative z-10 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 group-hover:animate-bounce"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Go to Home
        </span>
        <span className="absolute inset-0 border-2 border-transparent group-hover:border-purple-500 rounded-lg animate-[pulse_1.5s_infinite] opacity-0 group-hover:opacity-100 transition-all duration-300" />
        <span className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>
    </div>
  );
};

export default Upload;
