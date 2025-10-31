// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import api from "../../Api/api";
// import {
//   FaArrowLeft,
//   FaHeart,
//   FaRegComment,
//   FaRetweet,
//   FaShare,
// } from "react-icons/fa";
// import FollowUser from "../subscription/FollowUser";
// import UnfollowUser from "../subscription/UnfollowUser";

// const UserProfile = () => {
//   const { username } = useParams();
//   const [userData, setUserData] = useState(null);
//   const [tweets, setTweets] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchUserProfile = async () => {
//     try {
//       const res = await api.get(`/users/${username}`);
//       setUserData(res.data.user);
//       setTweets(res.data.tweets);
//     } catch (error) {
//       console.error(
//         "Error fetching user profile:",
//         error.response?.data || error
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUserProfile();
//   }, [username]);

//   if (loading) {
//     return (
//       <div className="text-white text-center py-20">Loading profile...</div>
//     );
//   }

//   if (!userData) {
//     return (
//       <div className="text-white text-center py-20">User not found 😢</div>
//     );
//   }

//   return (
//     <div className="bg-black text-white min-h-screen flex justify-center">
//       <div className="w-full sm:w-[600px] border-x border-gray-800">
//         {/* Header */}
//         <div className="flex items-center space-x-3 px-4 py-3 border-b border-gray-800">
//           <Link to="/" className="text-sky-500 hover:text-sky-400">
//             <FaArrowLeft />
//           </Link>
//           <h2 className="text-xl font-bold">{userData.fullName}</h2>
//         </div>

//         {/* User Info */}
//         <div className="p-4 border-b border-gray-800">
//           <img
//             src={userData.avatar}
//             alt={userData.username}
//             className="w-24 h-24 rounded-full object-cover mb-3"
//           />
//           <h2 className="text-xl font-semibold">{userData.fullName}</h2>
//           <p className="text-gray-500">@{userData.username}</p>
//           {userData.bio && <p className="mt-2 text-gray-300">{userData.bio}</p>}
//           <p className="text-gray-500 text-sm mt-2">
//             Joined {new Date(userData.createdAt).toLocaleDateString()}
//           </p>
//           <FollowUser userId={userData._id} />
//           <Link to={`/unfollow/${userData._id}`}>Unfollow</Link>
//         </div>

//         {/* Tweets */}
//         <div>
//           {tweets.length > 0 ? (
//             tweets.map((tweet) => (
//               <div
//                 key={tweet._id}
//                 className="border-b border-gray-800 px-4 py-3 hover:bg-[#16181C] transition"
//               >
//                 {/* Tweet Content (click to single tweet page) */}
//                 <Link to={`/tweet/${tweet._id}`} className="block">
//                   <p className="text-gray-200 text-[15px]">{tweet.content}</p>

//                   {tweet.image && (
//                     <div className="mt-3 rounded-2xl overflow-hidden border border-gray-700">
//                       <img
//                         src={tweet.image}
//                         alt="Tweet"
//                         className="w-full object-cover"
//                       />
//                     </div>
//                   )}
//                 </Link>

//                 {/* Tweet Actions */}
//                 <div className="flex justify-between mt-3 text-gray-500 text-sm">
//                   <button className="flex items-center space-x-1 hover:text-sky-500 transition">
//                     <FaRegComment />
//                     <span>12</span>
//                   </button>
//                   <button className="flex items-center space-x-1 hover:text-green-500 transition">
//                     <FaRetweet />
//                     <span>8</span>
//                   </button>
//                   <button className="flex items-center space-x-1 hover:text-pink-500 transition">
//                     <FaHeart />
//                     <span>25</span>
//                   </button>
//                   <button className="flex items-center space-x-1 hover:text-sky-500 transition">
//                     <FaShare />
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-gray-400 py-10">No tweets yet 😶</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../Api/api";
import {
  FaArrowLeft,
  FaHeart,
  FaRegComment,
  FaRetweet,
  FaShare,
} from "react-icons/fa";

const UserProfile = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  const fetchUserProfile = async () => {
    try {
      const res = await api.get(`/users/${username}`);
      const user = res.data.user;
      setUserData(user);
      setTweets(res.data.tweets || []);
      setIsFollowing(user.isFollowing || false);
    } catch (error) {
      console.error(
        "Error fetching user profile:",
        error.response?.data || error
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFollowToggle = async () => {
    if (!userData?._id) return;

    try {
      if (isFollowing) {
        await api.delete(`/subscription/unfollow/${userData._id}`);
        setUserData((prev) => ({
          ...prev,
          followersCount: (prev.followersCount || 1) - 1,
        }));
      } else {
        await api.post(`/subscription/follow/${userData._id}`);
        setUserData((prev) => ({
          ...prev,
          followersCount: (prev.followersCount || 0) + 1,
        }));
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.log("Error following/unfollowing user:", error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [username]);

  if (loading) {
    return (
      <div className="text-white text-center py-20">Loading profile...</div>
    );
  }

  if (!userData) {
    return (
      <div className="text-white text-center py-20">User not found 😢</div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen flex justify-center">
      <div className="w-full sm:w-[600px] border-x border-gray-800">
        {/* Header */}
        <div className="flex items-center space-x-3 px-4 py-3 border-b border-gray-800">
          <Link to="/" className="text-sky-500 hover:text-sky-400">
            <FaArrowLeft />
          </Link>
          <h2 className="text-xl font-bold">{userData.fullName}</h2>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-gray-800 flex flex-col items-center">
          <img
            src={
              userData.avatar ||
              "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
            }
            alt={userData.username}
            className="w-24 h-24 rounded-full object-cover mb-3 border border-gray-700"
          />
          <h2 className="text-xl font-semibold">{userData.fullName}</h2>
          <p className="text-gray-500">@{userData.username}</p>
          {userData.bio && (
            <p className="mt-2 text-gray-300 text-center">{userData.bio}</p>
          )}
          <p className="text-gray-500 text-sm mt-2">
            Joined {new Date(userData.createdAt).toLocaleDateString()}
          </p>

          <div className="flex gap-6 mt-4 text-gray-400 text-sm">
            <span>
              <strong className="text-white">
                {userData.followersCount || 0}
              </strong>{" "}
              Followers
            </span>
            <span>
              <strong className="text-white">
                {userData.followingCount || 0}
              </strong>{" "}
              Following
            </span>
          </div>

          {/* Follow / Unfollow Button */}
          <button
            onClick={handleFollowToggle}
            className={`mt-6 px-6 py-2 rounded-full font-semibold transition-all ${
              isFollowing
                ? "bg-transparent border border-gray-500 text-gray-300 hover:bg-gray-800"
                : "bg-[#1DA1F2] hover:bg-[#1991DA] text-white"
            }`}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        </div>

        {/* Tweets */}
        <div>
          {tweets.length > 0 ? (
            tweets.map((tweet) => (
              <div
                key={tweet._id}
                className="border-b border-gray-800 px-4 py-3 hover:bg-[#16181C] transition"
              >
                <Link to={`/tweet/${tweet._id}`} className="block">
                  <p className="text-gray-200 text-[15px]">{tweet.content}</p>
                  {tweet.image && (
                    <div className="mt-3 rounded-2xl overflow-hidden border border-gray-700">
                      <img
                        src={tweet.image}
                        alt="Tweet"
                        className="w-full object-cover"
                      />
                    </div>
                  )}
                </Link>

                {/* Tweet Actions */}
                <div className="flex justify-between mt-3 text-gray-500 text-sm">
                  <button className="flex items-center space-x-1 hover:text-sky-500 transition">
                    <FaRegComment />
                    <span>12</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-green-500 transition">
                    <FaRetweet />
                    <span>8</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-pink-500 transition">
                    <FaHeart />
                    <span>25</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-sky-500 transition">
                    <FaShare />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 py-10">No tweets yet 😶</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
