"use client";
import axios from "axios";
import { useState } from "react";

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
    </div>
  );
};

export default Upload;
