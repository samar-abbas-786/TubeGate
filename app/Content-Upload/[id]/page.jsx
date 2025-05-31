"use client";

import { useState } from "react";
import { CldUploadButton } from "next-cloudinary";
import { useParams } from "next/navigation";

export default function UploadForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    privacyStatus: "public",
    videoId: "",
  });
  const [message, setMessage] = useState("");
  const params = useParams();
  console.log("params", params.id);

  const handleUpload = (result) => {
    setFormData((prev) => ({
      ...prev,
      videoId: result.info.public_id,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.videoId) {
      setMessage("Please upload a video first");
      return;
    }

    try {
      const res = await fetch("/api/Content-Upload", {
        method: "POST",
        body: JSON.stringify({
          ...formData,
          userID: params.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data.success) {
        setMessage("Video uploaded and saved successfully!");
        setFormData({
          title: "",
          description: "",
          privacyStatus: "public",
          videoId: "",
        });
      } else {
        setMessage(data.message || "Failed to save video.");
      }
    } catch (err) {
      console.error(err);
      setMessage("An error occurred while saving the video.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter video title"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-purple-300 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter video description"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500 h-32"
              required
            />
          </div>

          <div>
            <label className="block text-purple-300 mb-2">Privacy Status</label>
            <select
              name="privacyStatus"
              value={formData.privacyStatus}
              onChange={handleChange}
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
            <CldUploadButton
              uploadPreset="unsigned_video_upload"
              onUploadAddedAction={handleUpload}
              options={{
                cloudName: "dcdpndvr3",
                resourceType: "video",
              }}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
            >
              Upload Video
            </CldUploadButton>

            {formData.videoId && (
              <p className="text-sm text-purple-300 bg-gray-700 p-3 rounded-lg">
                <span className="font-semibold">Public ID:</span>{" "}
                {formData.videoId}
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
