import React, { useEffect, useState } from "react";
import api from "../../Api/api";
import { Link } from "react-router-dom";

const GetUserTweet = ({ id }) => {
  const [userTweet, setUserTweet] = useState([]);

  const userTweets = async () => {
    try {
      const res = await api.get(`/tweets/${id}`);
      console.log(res.data.data);
      setUserTweet(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userTweets();
  }, []);

  return (
    <div className="w-full bg-black text-white min-h-screen">
      {userTweet.length === 0 ? (
        <div className="text-gray-500 text-center py-6">No tweets found.</div>
      ) : (
        <div className="divide-y divide-gray-800">
          {userTweet.map((tweet) => (
            <div
              key={tweet._id}
              className="p-4 flex gap-3 hover:bg-gray-900 transition-colors"
            >
              {/* Avatar */}
              <Link to={`/user/${tweet.owner._id}`}>
                <img
                  src={tweet.owner.avatar}
                  alt={tweet.owner.username}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </Link>

              {/* Tweet Content */}
              <div className="flex-1">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white">
                      {tweet.owner.username}
                    </h3>
                    <span className="text-gray-500 text-sm">
                      @{tweet.owner.username.toLowerCase()}
                    </span>
                    <span className="text-gray-500 text-sm">·</span>
                    <span className="text-gray-500 text-sm">
                      {new Date(tweet.createdAt).toLocaleDateString("en-IN", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                {/* Tweet Text */}
                <p className="text-gray-200 mt-2 text-[15px] leading-snug">
                  {tweet.content}
                </p>

                {/* Tweet Image (optional) */}
                {tweet.image && (
                  <div className="mt-3 rounded-2xl overflow-hidden border border-gray-700">
                    <img
                      src={tweet.image}
                      alt="tweet media"
                      className="w-full object-cover max-h-[400px]"
                    />
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-between mt-3 text-gray-500 text-sm">
                  <Link
                    to={`/tweet/${tweet._id}`}
                    className="hover:text-blue-400 transition"
                  >
                    View details
                  </Link>
                  <button className="hover:text-pink-500">❤️ Like</button>
                  <button className="hover:text-green-500">💬 Comment</button>
                  <button className="hover:text-yellow-400">↩️ Repost</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetUserTweet;
