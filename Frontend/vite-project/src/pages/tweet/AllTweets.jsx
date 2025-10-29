import React, { useEffect, useState } from "react";
import api from "../../Api/api";
import { FaRegComment, FaRetweet, FaHeart, FaShare } from "react-icons/fa";
import { Link } from "react-router-dom";

const AllTweets = () => {
  const [tweets, setTweets] = useState([]);
  const [message, setMessage] = useState("");

  const fetchAllTweets = async () => {
    try {
      const res = await api.get("/tweets");
      console.log(res.data.data);
      setTweets(res.data.data);
      setMessage(res.data.message || "Tweets fetched successfully");
    } catch (error) {
      console.error(error.response?.data);
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchAllTweets();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen flex justify-center">
      <div className="w-full sm:w-[600px] border-x border-gray-800">
        {/* Tweets List */}
        <div>
          {tweets.length > 0 ? (
            tweets.map((tweet) => (
              <Link key={tweet._id} to={`/tweet/${tweet._id}`}>
                <div
                  key={tweet._id}
                  className="border-b border-gray-800 px-4 py-3 hover:bg-[#16181C] transition"
                >
                  {/* User Info */}
                  <div className="flex items-start space-x-3">
                    <img
                      src={tweet.owner?.avatar}
                      alt={tweet.owner?.username}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold">
                            {tweet.owner?.username}
                          </h3>
                          <span className="text-gray-500 text-sm">
                            @{tweet.owner?.fullName}
                          </span>
                          <span className="text-gray-500 text-sm">·</span>
                          <span className="text-gray-500 text-sm">
                            {new Date(tweet.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      {/* Tweet Content */}
                      <p className="text-gray-200 text-[15px] mt-1">
                        {tweet.content}
                      </p>

                      {/* Tweet Image */}
                      {tweet.image && (
                        <div className="mt-3 rounded-2xl overflow-hidden border border-gray-700">
                          <img
                            src={tweet.image}
                            alt="Tweet"
                            className="w-full object-cover"
                          />
                        </div>
                      )}

                      {/* Actions */}
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
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-400 py-10">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllTweets;
