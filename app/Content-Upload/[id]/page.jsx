"use client";

import { useState, useEffect } from "react";
import { openUploadWidget } from "../../../utils/cloudinary";
import { useParams } from "next/navigation";

export default function UploadForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [privacyStatus, setPrivacyStatus] = useState("public");
  const [videoId, setVideoId] = useState("");
  const [message, setMessage] = useState("");
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const params = useParams();

  // Dynamically load the Cloudinary widget script on component mount
  useEffect(() => {
    if (!window.cloudinary) {
      const script = document.createElement("script");
      script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
      script.async = true;
      script.onload = () => setScriptLoaded(true);
      script.onerror = () => {
        setMessage("Failed to load Cloudinary widget script.");
      };
      document.body.appendChild(script);
    } else {
      setScriptLoaded(true);
    }
  }, []);

  const handleUpload = () => {
    if (!scriptLoaded) {
      alert("Cloudinary widget not loaded yet. Please wait a moment.");
      return;
    }

    openUploadWidget(
      process.env.NEXT_PUBLIC_CLOUD_NAME,
      process.env.NEXT_PUBLIC_UPLOAD_PRESET,
      (publicId) => setVideoId(publicId)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!videoId) {
      alert("Please upload a video first");
      return;
    }

    try {
      const res = await fetch("/api/Content-Upload", {
        method: "POST",
        body: JSON.stringify({
          title,
          description,
          privacyStatus,
          publicId: videoId,
          userID: params.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data.success) {
        setMessage("Video uploaded and saved successfully!");
        setTitle("");
        setDescription("");
        setPrivacyStatus("public");
        setVideoId("");
      } else {
        setMessage("Failed to save video.");
      }
    } catch (err) {
      console.error(err);
      setMessage("An error occurred while saving the video.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-purple-400 p-6 pt-24">
      <div className="max-w-xl mx-auto bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-purple-300">
          Upload Video
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-purple-300 mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter video title"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-purple-300 mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter video description"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500 h-32"
              required
            />
          </div>

          <div>
            <label className="block text-purple-300 mb-2">Privacy Status</label>
            <select
              value={privacyStatus}
              onChange={(e) => setPrivacyStatus(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="public" className="bg-gray-800">
                Public
              </option>
              <option value="private" className="bg-gray-800">
                Private
              </option>
              <option value="unlisted" className="bg-gray-800">
                Unlisted
              </option>
            </select>
          </div>

          <div className="flex flex-col space-y-4">
            <button
              type="button"
              onClick={handleUpload}
              disabled={!scriptLoaded}
              className={`${
                scriptLoaded
                  ? "bg-purple-600 hover:bg-purple-700"
                  : "bg-purple-900 cursor-not-allowed"
              } text-white font-bold py-3 px-6 rounded-lg transition duration-200`}
            >
              Upload Video
            </button>

            {videoId && (
              <p className="text-sm text-purple-300 bg-gray-700 p-3 rounded-lg">
                <span className="font-semibold">Public ID:</span> {videoId}
              </p>
            )}

            <button
              type="submit"
              className="bg-purple-800 hover:bg-purple-900 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
            >
              Save to Database
            </button>
          </div>
        </form>

        {message && (
          <div
            className={`mt-6 p-4 rounded-lg ${
              message.includes("successfully")
                ? "bg-green-900 text-green-300"
                : "bg-red-900 text-red-300"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
