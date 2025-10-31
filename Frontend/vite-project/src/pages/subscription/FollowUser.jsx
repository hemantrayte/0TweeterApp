import React, { useEffect, useState } from "react";
import api from "../../Api/api";
import { useParams } from "react-router-dom";

const FollowUser = ({ userId }) => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  const fetchUser = async () => {
    try {
      const res = await api.get(`/users/${username}`);
      const userData = res.data?.user || {}; // ✅ fixed
      setUser(userData);
      console.log(userData);
      setIsFollowing(userData.isFollowing || false);
    } catch (error) {
      console.log("Error fetching user:", error);
    }
  };

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        await api.delete(`/subscription/unfollow/${user._id}`);
        setIsFollowing(false);
        setUser({
          ...user,
          followersCount: user.followersCount - 1,
        });
      } else {
        await api.post(`/subscription/follow/${user._id}`);
        setIsFollowing(true);
        setUser({
          ...user,
          followersCount: user.followersCount + 1,
        });
      }
    } catch (error) {
      console.log("Error following user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  if (!user || !user.username) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-gray-400">
        Loading user...
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-gray-100 flex flex-col items-center py-10">
      <div className="max-w-md w-full bg-[#16181C] border border-gray-800 rounded-2xl shadow-md p-6 flex flex-col items-center">
        <img
          src={
            user.avatar ||
            "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
          }
          alt="User Avatar"
          className="w-24 h-24 rounded-full object-cover border-2 border-gray-700"
        />
        <h2 className="mt-4 text-2xl font-semibold text-white">
          {user.fullName}
        </h2>
        <p className="text-gray-400">@{user.username}</p>
        <p className="text-gray-300 text-center mt-3">
          {user.bio || "No bio available"}
        </p>

        <div className="flex gap-6 mt-4 text-gray-400 text-sm">
          <span>
            <strong className="text-white">{user.followersCount || 0}</strong>{" "}
            Followers
          </span>
          <span>
            <strong className="text-white">{user.followingCount || 0}</strong>{" "}
            Following
          </span>
        </div>

        <button
          onClick={handleFollowToggle}
          className={`mt-6 px-6 py-2 rounded-full font-semibold transition-all ${
            isFollowing
              ? "bg-transparent border border-gray-500 text-gray-300 hover:bg-gray-800"
              : "bg-[#1DA1F2] hover:bg-[#1991DA] text-white"
          }`}
        >
          {isFollowing ? "Following" : "Follow"}
        </button>
      </div>
    </div>
  );
};

export default FollowUser;
