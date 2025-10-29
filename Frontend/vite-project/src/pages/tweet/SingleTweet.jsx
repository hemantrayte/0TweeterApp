import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaRegHeart,
  FaRegComment,
  FaRetweet,
} from "react-icons/fa";
import api from "../../Api/api";
import TweetComments from "../comments/TweetComments";

const SingleTweet = () => {
  const { tweetId } = useParams();
  const navigate = useNavigate();
  const [tweet, setTweet] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // ✅ Fetch logged-in user info
  const fetchCurrentUser = async () => {
    try {
      const res = await api.get("/users/current-user"); // Adjust if your route differs
      setCurrentUser(res.data.data);
    } catch (error) {
      console.log("Failed to fetch current user:", error);
    }
  };

  // ✅ Fetch the tweet
  const fetchSingleTweet = async () => {
    try {
      const res = await api.get(`/tweets/id/${tweetId}`);
      setTweet(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSingleTweet();
    fetchCurrentUser();
  }, [tweetId]);

  if (!tweet) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500 text-lg bg-black">
        Loading tweet...
      </div>
    );
  }

  // ✅ Check ownership
  const isOwner = currentUser?._id === tweet?.owner?._id;

  return (
    <div className="bg-black min-h-screen text-gray-100 flex flex-col">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-800 sticky top-0 bg-black/80 backdrop-blur">
        <button
          onClick={() => navigate(-1)}
          className="mr-4 text-gray-400 hover:text-white"
        >
          <FaArrowLeft size={18} />
        </button>
        <h2 className="text-xl font-bold">Tweet</h2>
      </div>

      {/* Tweet Content */}
      <div className="max-w-2xl mx-auto w-full border-x border-gray-800 p-5">
        <div className="flex items-start gap-3">
          <img
            src={tweet?.owner?.avatar}
            alt="User Avatar"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-white">
              {tweet?.owner?.fullName}
            </h3>
            <p className="text-gray-400 text-sm">@{tweet?.owner?.username}</p>
          </div>
        </div>

        <p className="mt-4 text-lg text-gray-100 leading-relaxed">
          {tweet.content}
        </p>

        {tweet.image && (
          <div className="mt-4 rounded-2xl overflow-hidden border border-gray-800">
            <img
              src={tweet.image}
              alt="Tweet Media"
              className="w-full object-cover"
            />
          </div>
        )}

        <p className="mt-4 text-sm text-gray-500">
          {new Date(tweet.createdAt).toLocaleString()}
        </p>

        <div className="flex justify-around mt-4 border-t border-b border-gray-800 py-3 text-gray-500">
          <button className="hover:text-twitter-blue transition-colors flex items-center gap-2">
            <FaRegComment /> <span>12</span>
          </button>
          <button className="hover:text-green-500 transition-colors flex items-center gap-2">
            <FaRetweet /> <span>4</span>
          </button>
          <button className="hover:text-red-500 transition-colors flex items-center gap-2">
            <FaRegHeart /> <span>23</span>
          </button>
        </div>
        <TweetComments tweetId={tweet._id} />

        {/* ✅ Show buttons only if logged-in user is owner */}

        {isOwner && (
          <div className="flex gap-3 mt-5">
            <Link
              to={`/tweet/update/${tweet._id}`}
              className="flex-1 text-center py-2 bg-[#1DA1F2] hover:bg-[#1991DA] rounded-full text-white font-semibold transition-all"
            >
              Update Tweet
            </Link>
            <Link
              to={`/tweet/delete/${tweet._id}`}
              className="flex-1 text-center py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-full font-semibold transition-all"
            >
              Delete Tweet
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleTweet;
