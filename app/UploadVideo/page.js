"use client";
import axios from "axios";
import { useState } from "react";

const Upload = () => {
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    setMessage("Uploading...");
    try {
      const response = await axios.post("/api/Upload");
      setMessage(`✅ Video uploaded! Video ID: ${response.data.videoId}`);
    } catch (error) {
      setMessage(
        `❌ Upload failed: ${error.response?.data?.error || error.message}`
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <button
        onClick={handleUpload}
        className="px-3 py-2 mt-5 rounded-sm bg-red-600 text-white text-lg font-bold"
      >
        Upload video
      </button>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default Upload;
