import React, { useEffect, useState } from "react";
import api from "../../Api/api";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaRegHeart } from "react-icons/fa";

const GetLikedTweets = () => {
  const [likedTweets, setLikedTweets] = useState([]);
  const navigate = useNavigate();

  const fetchLikedTweets = async () => {
    try {
      const res = await api.get("/likes/liketweets");
      setLikedTweets(res.data.data || []);
    } catch (error) {
      console.log("Error fetching liked tweets:", error);
    }
  };

  useEffect(() => {
    fetchLikedTweets();
  }, []);

  return (
    <div className="bg-black min-h-screen text-gray-100">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-800 sticky top-0 bg-black/80 backdrop-blur">
        <button
          onClick={() => navigate(-1)}
          className="mr-4 text-gray-400 hover:text-white"
        >
          <FaArrowLeft size={18} />
        </button>
        <h2 className="text-xl font-bold">Liked Tweets</h2>
      </div>

      {/* Tweets List */}
      <div className="max-w-2xl mx-auto w-full border-x border-gray-800">
        {likedTweets.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">
            You haven’t liked any tweets yet.
          </p>
        ) : (
          likedTweets.map((tweet) => (
            <div
              key={tweet._id}
              className="p-4 border-b border-gray-800 hover:bg-gray-900 transition cursor-pointer"
              onClick={() => navigate(`/tweet/${tweet._id}`)}
            >
              <div className="flex items-start gap-3">
                <img
                  src={tweet.owner?.avatar}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-white">
                        {tweet.owner?.fullName}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        @{tweet.owner?.username}
                      </p>
                    </div>
                    <FaRegHeart className="text-red-500" />
                  </div>

                  <p className="mt-2 text-gray-100 leading-relaxed">
                    {tweet.content}
                  </p>

                  {tweet.image && (
                    <div className="mt-3 rounded-2xl overflow-hidden border border-gray-800">
                      <img
                        src={tweet.image}
                        alt="Tweet Media"
                        className="w-full object-cover"
                      />
                    </div>
                  )}

                  <p className="mt-3 text-sm text-gray-500">
                    {new Date(tweet.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GetLikedTweets;
