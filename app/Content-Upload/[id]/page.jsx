"use client";

import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { useParams } from "next/navigation";

export default function UploadForm() {
  //   const [data, setData] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [privacyStatus, setPrivacyStatus] = useState("public");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const params = useParams();

  const handleUploadSuccess = (result) => {
    setUrl(result.info.secure_url);
    setMessage("Video uploaded to Cloudinary successfully.");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!url) {
      setMessage("Please upload a video first");
      return;
    }

    try {
      const res = await fetch("/api/POST_CONTENT", {
        method: "POST",
        body: JSON.stringify({
          title,
          description,
          privacyStatus,
          url,
          userId: params.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resData = await res.json();

      if (resData.success) {
        setMessage("Video saved to database successfully!");
        setTitle("");
        setDescription("");
        setPrivacyStatus("public");
        setUrl("");
      } else {
        setMessage(resData.message || "Failed to save video.");
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
          {/* Cloudinary Upload Widget */}
          <div>
            <label className="block text-purple-300 mb-2">Video</label>
            <CldUploadWidget
              uploadPreset={process.env.NEXT_PUBLIC_UPLOAD_PRESET}
              onSuccess={handleUploadSuccess}
            >
              {({ open }) => (
                <button
                  type="button"
                  onClick={() => open()}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 cursor-pointer"
                >
                  {url ? "Upload Another Video" : "Upload Video"}
                </button>
              )}
            </CldUploadWidget>
          </div>

          {/* Video Preview */}
          {/* Video Preview */}
          <div>
            {url && (
              <video
                controls
                src={url}
                className="w-full h-[360px] rounded-lg"
              ></video>
            )}
          </div>

          {/* Title Input */}
          <div>
            <label className="block text-purple-300 mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter video title"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-purple-300 mb-2">Description</label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter video description"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500 h-32"
              required
            />
          </div>

          {/* Privacy Status */}
          <div>
            <label className="block text-purple-300 mb-2">Privacy Status</label>
            <select
              name="privacyStatus"
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!url}
            className={`w-full ${
              url
                ? "bg-purple-800 hover:bg-purple-900"
                : "bg-purple-600 cursor-not-allowed"
            } text-white font-bold py-3 px-6 rounded-lg transition duration-200`}
          >
            Save to Database
          </button>
        </form>

        {/* Message */}
        {message && (
          <div
            className={`mt-6 p-4 rounded-lg ${
              message.toLowerCase().includes("success")
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
