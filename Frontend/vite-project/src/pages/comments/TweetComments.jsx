import React, { useEffect, useState } from "react";
import api from "../../Api/api";
import { useNavigate } from "react-router-dom";
import { FaRegComment } from "react-icons/fa";

const TweetComments = ({ tweetId }) => {
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  const fetchTweetComment = async () => {
    try {
      const res = await api.get(`/comments/comments/${tweetId}`);
      setComments(res.data.data);
    } catch (error) {
      console.log(error, "Error during fetch tweet comment");
    }
  };

  const handleClick = () => {
    navigate(`/comment/create/${tweetId}`);
  };

  useEffect(() => {
    fetchTweetComment();
  }, [tweetId]);

  return (
    <div className="bg-black text-gray-100 border-t border-gray-800">
      {/* Add Comment Button */}
      <div className="p-4 border-b border-gray-800">
        <button
          onClick={handleClick}
          className="flex items-center gap-2 text-[#1DA1F2] font-semibold hover:underline"
        >
          <FaRegComment /> Reply to this tweet
        </button>
      </div>

      {/* Comments List */}
      <div>
        {comments.length === 0 ? (
          <p className="text-gray-500 text-center py-6">
            No comments yet. Be the first to reply!
          </p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment._id}
              className="flex items-start gap-3 p-4 border-b border-gray-800 hover:bg-gray-900/50 transition"
            >
              {/* Avatar */}
              <img
                src={comment.owner?.avatar}
                alt={comment.owner?.username}
                className="w-10 h-10 rounded-full object-cover"
              />

              {/* Comment Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-white">
                    {comment.owner?.fullName}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    @{comment.owner?.username} ·{" "}
                    {new Date(comment.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                <p className="mt-1 text-gray-200">{comment.content}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TweetComments;
