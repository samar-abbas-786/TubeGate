"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaYoutube } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "../../../context/authContext";

const IncomingVideoUpload = () => {
  const { video, setVideo } = useAuth();
  const [sharedContent, setSharedContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getRequestPostedToMe = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?.id) return;

      try {
        const res = await fetch(`/api/GetShareContentByID?userId=${user.id}`);
        const data = await res.json();
        setSharedContent(data.contentPostedToMe || []);
      } catch (err) {
        console.error("Error fetching shared content:", err);
      } finally {
        setLoading(false);
      }
    };

    getRequestPostedToMe();
  }, []);

  const handleUploadYouTube = (title, url, description, privacyStatus) => {
    // setVideo({
    //   title: title,
    //   url: url,
    //   description: description,
    //   privacyStatus: privacyStatus,
    // });
    // console.log("video", video);
    localStorage.setItem(
      "VideoData",
      JSON.stringify({
        title,
        url,
        description,
        privacyStatus,
      })
    );
    router.push("/api/OAuth");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 pt-24 text-purple-300 p-6">
      <h1 className="text-4xl font-bold mb-10 text-center text-purple-400 drop-shadow-lg">
        📥 Incoming Videos
      </h1>

      {loading ? (
        <p className="text-center text-lg">Loading...</p>
      ) : sharedContent.length === 0 ? (
        <p className="text-center text-2xl text-purple-500">
          No Content Posted to You
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sharedContent.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800 rounded-2xl shadow-2xl border border-purple-700 overflow-hidden hover:scale-[1.03] transition-transform duration-300"
            >
              <video
                src={video.url}
                controls
                className="w-full h-64 object-cover rounded-t-2xl"
              />
              <div className="p-4 space-y-2">
                <h2 className="text-2xl font-semibold">{video.title}</h2>
                <p className="text-sm text-purple-300 line-clamp-3">
                  {video.description}
                </p>
                <p className="text-xs text-purple-400">
                  Privacy: {video.privacyStatus}
                </p>
                <button
                  onClick={() =>
                    handleUploadYouTube(
                      video.title,
                      video.url,
                      video.description,
                      video.privacyStatus
                    )
                  }
                  className="mt-3 flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition duration-200"
                >
                  <FaYoutube className="text-lg" /> Upload to YouTube
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IncomingVideoUpload;
