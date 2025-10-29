import React, { useEffect, useState } from "react";
import api from "../../Api/api";
import { Link, useParams } from "react-router-dom";

const SingleComment = () => {
  const { commentId } = useParams();

  const [comment, setComment] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const fetchCurrentUser = async () => {
    try {
      const res = await api.get("/users/current-user");
      setCurrentUser(res.data.data);
    } catch (error) {
      console.log("❌ Failed to fetch user:", error);
    }
  };

  const fetchSingleComment = async () => {
    try {
      const res = await api.get(`/comments/c/${commentId}`);
      setComment(res.data.data);
    } catch (error) {
      console.log("❌ Failed to fetch comment:", error);
    }
  };

  useEffect(() => {
    fetchSingleComment();
    fetchCurrentUser();
  }, [commentId]);

  const isOwner = currentUser?._id === comment?.owner?._id;

  if (!comment) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500 bg-black">
        Loading comment...
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-gray-100 flex flex-col items-center py-8">
      <div className="max-w-xl w-full border border-gray-800 rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <img
            src={comment?.owner?.avatar}
            alt="avatar"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h2 className="font-semibold text-white">
              {comment?.owner?.username}
            </h2>
            <p className="text-gray-500 text-sm">
              {new Date(comment.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        <p className="mt-4 text-lg text-gray-100 leading-relaxed">
          {comment.content}
        </p>

        {isOwner && (
          <div className="flex gap-3 mt-5">
            <Link
              to={`/comment/update/${comment._id}`}
              className="flex-1 text-center py-2 bg-[#1DA1F2] hover:bg-[#1991DA] rounded-full text-white font-semibold transition-all"
            >
              Update Comment
            </Link>
            <Link
              to={`/comment/delete/${comment._id}`}
              className="flex-1 text-center py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-full font-semibold transition-all"
            >
              Delete Comment
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleComment;
