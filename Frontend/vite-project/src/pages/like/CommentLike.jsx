import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
import { Heart } from "lucide-react";
import api from "../../Api/api";

const CommentLike = ({ commentId }) => {
  // const { commentId } = useParams();
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  // // Fetch current like status & count (optional if backend supports)
  // const fetchCommentLike = async () => {
  //   try {
  //     const res = await api.get(`/comments/c/${commentId}`);
  //     // Assuming your comment model returns likes array or count
  //     setLikesCount(res.data.data.likes?.length || 0);
  //     // Check if current user liked
  //     setLiked(res.data.data.isLikedByCurrentUser || false);
  //   } catch (error) {
  //     console.log("Error fetching comment like status:", error);
  //   }
  // };

  // Toggle like
  const handleToggleLike = async () => {
    try {
      await api.post(`/likes/toggle/c/${commentId}`);
      setLiked(!liked);
      setLikesCount((prev) => (liked ? prev - 1 : prev + 1));
    } catch (error) {
      console.log("Error toggling comment like:", error);
    }
  };

  useEffect(() => {
    // fetchCommentLike();
  }, []);

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleToggleLike}
        className="flex items-center space-x-1 group transition"
      >
        <Heart
          className={`w-6 h-6 transition-all ${
            liked
              ? "fill-[#F91880] stroke-[#F91880]"
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

export default CommentLike;
