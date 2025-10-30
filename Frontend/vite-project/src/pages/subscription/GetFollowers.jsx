import React, { useEffect, useState } from "react";
import api from "../../Api/api";
import { Link, useParams } from "react-router-dom";

const GetFollowers = () => {
  const { userId } = useParams(); // ✅ from route
  const [followers, setFollowers] = useState([]);

  // Fetch followers
  const fetchFollowers = async () => {
    try {
      const res = await api.get(`/followers/${userId}`);
      setFollowers(res.data.data || []);
    } catch (error) {
      console.log("Error fetching followers:", error);
    }
  };

  useEffect(() => {
    fetchFollowers();
  }, [userId]);

  return (
    <div className="bg-black min-h-screen text-gray-100 flex flex-col items-center py-8">
      <div className="max-w-2xl w-full border-x border-gray-800 px-6">
        {/* Header */}
        <h2 className="text-2xl font-bold mb-6 text-white">Followers</h2>

        {followers.length === 0 ? (
          <p className="text-gray-400 text-center mt-10">
            This user doesn’t have any followers yet.
          </p>
        ) : (
          <div className="flex flex-col gap-5">
            {followers.map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between bg-[#16181C] border border-gray-800 rounded-xl p-4 hover:bg-[#1A1D21] transition"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={
                      user.avatar ||
                      "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
                    }
                    alt={user.username}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <Link
                      to={`/user/${user._id}`}
                      className="text-white font-semibold hover:underline"
                    >
                      {user.fullName}
                    </Link>
                    <p className="text-gray-400 text-sm">@{user.username}</p>
                  </div>
                </div>

                <button className="px-4 py-1 border border-gray-600 rounded-full text-sm text-gray-300 hover:bg-gray-800 transition">
                  Follow Back
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GetFollowers;
