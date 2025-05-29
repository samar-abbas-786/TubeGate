"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const GetEditor = () => {
  const [userlist, setUserlist] = useState([]);

  const getUserList = async () => {
    try {
      const response = await axios.get("/api/USER/GetEditor");
      if (response) setUserlist(response.data.editor);
    } catch (error) {
      console.log("error in editor list", error);
    }
  };

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-purple-400 mb-6">
        <span className="bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent">
          Editor List
        </span>
      </h2>

      <ul className="w-full max-w-md space-y-4">
        {userlist.map((user, index) => (
          <Link
            href={`/editor/${user.id}`}
            key={index}
            className="block w-full bg-purple-900/20 border border-purple-600/30 rounded-lg px-6 py-4 shadow-md hover:shadow-purple-500/20 transition-all"
          >
            <span className="text-lg font-medium text-purple-300">
              {user.name}
            </span>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default GetEditor;
