"use client";

import { useState, useRef } from "react";
import { CldUploadButton } from "next-cloudinary";
import { useParams } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";

export default function UploadForm() {
  const [data, setData] = useState();
  const [title,setTitle]=useState()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    privacyStatus: "public",
    publicId: "",
  });
  const [message, setMessage] = useState("");
  const params = useParams();

  const handleUpload = (result) => {
    setFormData((prev) => ({
      ...prev,
      publicId: result.info.public_id,
    }));
    setMessage("Video uploaded to Cloudinary successfully.");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.publicId) {
      setMessage("Please upload a video first");
      return;
    }

    try {
      const res = await fetch("/api/POST_CONTENT", {
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
        setMessage("Video saved to database successfully!");
        setFormData({
          title: "",
          description: "",
          privacyStatus: "public",
          publicId: "",
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
          {/* Cloudinary Upload Button */}
          <div>
            <label className="block text-purple-300 mb-2">Video</label>
            {/* <CldUploadButton
              uploadPreset={process.env.NEXT_PUBLIC_UPLOAD_PRESET}
              onUploadAdded={handleUpload}
              options={{ resourceType: "video" }}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 cursor-pointer text-center"
            >
              {formData.publicId ? "Upload Another Video" : "Upload Video"}
            </CldUploadButton> */}
            <CldUploadWidget
              uploadPreset={process.env.NEXT_PUBLIC_UPLOAD_PRESET}
              onSuccess={(result, { widget }) => {
                setData(result?.info);
                console.log("Upload result:", result);
              }}
            >
              {({ open }) => {
                return (
                  <div>
                    <button onClick={() => open()}>Upload</button>
                  </div>
                );
              }}
            </CldUploadWidget>

            {formData.publicId && (
              <p className="mt-3 text-sm text-purple-300 bg-gray-700 p-3 rounded-lg break-all">
                <span className="font-semibold">Public ID:</span>{" "}
                {formData.publicId}
              </p>
            )}
          </div>
          <div>
            <video src={data?.secure_url}></video>
          </div>
          {/* Title Input */}
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

          {/* Description Input */}
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

          {/* Privacy Status */}
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!formData.publicId}
            className={`w-full ${
              formData.publicId
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
