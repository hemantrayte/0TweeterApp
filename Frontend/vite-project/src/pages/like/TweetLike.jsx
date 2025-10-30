import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import api from "../../Api/api";

const TweetLike = ({ tweetId }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const fetchTweetLike = async () => {
    try {
      const res = await api.post(`/likes/toggle/t/${tweetId}`);
      const tweet = res.data.data;
      setLikesCount(tweet?.likes?.length || 0);
      setLiked(tweet?.isLikedByCurrentUser || false);
    } catch (error) {
      console.log("Error fetching tweet like data:", error);
    }
  };

  const handleToggleLike = async () => {
    try {
      console.log("🟢 Sending like toggle request for tweet:", tweetId);
      await api.post(`/likes/toggle/t/${tweetId}`);
      setLiked(!liked);
      setLikesCount((prev) => (liked ? prev - 1 : prev + 1));
    } catch (error) {
      console.log("Error toggling like:", error);
    }
  };

  useEffect(() => {
    fetchTweetLike();
  }, [tweetId]);

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleToggleLike}
        className="flex items-center group transition"
      >
        <Heart
          className={`w-6 h-6 transition-all duration-200 ${
            liked
              ? "fill-[#F91880] stroke-[#F91880] scale-110"
              : "stroke-gray-500 group-hover:stroke-[#F91880]"
          }`}
        />
      </button>
      <span
        className={`text-sm font-medium ${
          liked ? "text-[#F91880]" : "text-gray-400"
        }`}
      >
        {likesCount}
      </span>
    </div>
  );
};

export default TweetLike;
