"use client";

import { useState } from "react";
import { openUploadWidget } from "@/lib/cloudinary";

export default function UploadForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [privacyStatus, setPrivacyStatus] = useState("public");
  const [userID, setUserID] = useState("");
  const [videoId, setVideoId] = useState("");
  const [message, setMessage] = useState("");

  const handleUpload = () => {
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
      const res = await fetch("/api/videos", {
        method: "POST",
        body: JSON.stringify({
          title,
          description,
          privacyStatus,
          publicId: videoId,
          userID,
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
        setUserID("");
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
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Upload Video</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="border w-full p-2 rounded"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="border w-full p-2 rounded"
          required
        />
        <select
          value={privacyStatus}
          onChange={(e) => setPrivacyStatus(e.target.value)}
          className="border w-full p-2 rounded"
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
          <option value="unlisted">Unlisted</option>
        </select>
        <input
          type="text"
          value={userID}
          onChange={(e) => setUserID(e.target.value)}
          placeholder="User ID"
          className="border w-full p-2 rounded"
          required
        />
        <button
          type="button"
          onClick={handleUpload}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Upload Video
        </button>
        {videoId && (
          <p className="text-sm text-gray-600">Public ID: {videoId}</p>
        )}
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Save to Database
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}
