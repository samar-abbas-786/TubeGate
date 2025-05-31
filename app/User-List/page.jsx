"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const Getuser = () => {
  const [userlist, setUserlist] = useState([]);
  // const user2 = JSON.parse(localStorage.getItem("user"));

  const getUserList = async () => {
    try {
      const response = await axios.get("/api/USER/GetUser");
      if (response) setUserlist(response.data.userlist);
    } catch (error) {
      console.log("error in user list", error);
    }
  };

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-purple-400 mb-6">
        <span className="bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent">
          User List
        </span>
      </h2>

      <ul className="w-full max-w-md space-y-4">
        {userlist.map((user, index) => (
          <li
            key={index}
            className="bg-purple-900/20 border border-purple-600/30 rounded-lg px-6 py-4 shadow-md hover:shadow-purple-500/30 transition-all"
          >
            <div className="flex justify-between items-center">
              <Link
                href={`/User-List/${user.id}`}
                className="text-lg font-medium text-purple-300 hover:underline"
              >
                {user.name}
              </Link>
              {
                <Link
                  href={`/Content-Upload/${user.id}`}
                  // onClick={() => alert(`Send action for ${user.name}`)}
                  className="ml-4 bg-purple-700 hover:bg-purple-800 text-white text-sm px-4 py-1 rounded shadow transition-all"
                >
                  Send
                </Link>
              }
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Getuser;
