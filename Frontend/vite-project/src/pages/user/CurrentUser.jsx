import React, { useEffect, useState } from "react";
import api from "../../Api/api";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const CurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const fetchCurrentUser = async () => {
    try {
      const res = await api.get("users/current-user");
      setCurrentUser(res.data.data);
    } catch (error) {
      console.log("User not fetched", error);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500 text-lg">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-black text-white min-h-screen border-x border-gray-800">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-800 sticky top-0 bg-black/80 backdrop-blur">
        <button
          onClick={() => navigate(-1)}
          className="mr-4 text-gray-400 hover:text-white"
        >
          <FaArrowLeft size={18} />
        </button>
        <h2 className="text-xl font-bold">Profile</h2>
      </div>

      {/* Banner section */}
      <div className="relative">
        <div className="h-40 bg-gray-700"></div>

        <img
          src={currentUser.avatar}
          alt="avatar"
          className="absolute bottom-0 left-4 transform translate-y-1/2 w-24 h-24 rounded-full border-4 border-black object-cover"
        />
      </div>

      {/* Profile Info */}
      <div className="mt-14 px-4">
        <div className="flex justify-end">
          <button
            onClick={() => navigate("/user/update")}
            className="border border-gray-500 text-sm px-4 py-1 rounded-full font-semibold hover:bg-gray-800"
          >
            Edit profile
          </button>
        </div>

        <div className="mt-2">
          <h1 className="text-xl font-bold">{currentUser.fullName}</h1>
          <p className="text-gray-500">@{currentUser.username}</p>
          <p className="mt-2 text-gray-300">{currentUser.email}</p>
        </div>

        {/* Joined info & placeholder stats */}
        <div className="mt-4 flex gap-4 text-sm text-gray-400">
          <p>
            <span className="font-semibold text-white">120</span> Following
          </p>
          <p>
            <span className="font-semibold text-white">200</span> Followers
          </p>
        </div>
      </div>
    </div>
  );
};

export default CurrentUser;
