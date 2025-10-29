import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../Api/api";
import { FaArrowLeft } from "react-icons/fa";

const UpdateComment = () => {
  const [updateComment, setUpdateComment] = useState("");
  const { commentId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.patch(
        `/comments/c/${commentId}`,
        { content: updateComment },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(res.data.data);
      navigate(-2);
    } catch (error) {
      console.log(error);
    }
  };

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
        <h2 className="text-xl font-bold">Edit Comment</h2>
      </div>

      {/* Form Section */}
      <div className="max-w-2xl mx-auto mt-10 px-5">
        <form
          onSubmit={handleSubmit}
          className="bg-black border border-gray-800 rounded-2xl p-5 shadow-lg"
        >
          <textarea
            value={updateComment}
            onChange={(e) => setUpdateComment(e.target.value)}
            placeholder="Update your comment..."
            rows={4}
            className="w-full bg-transparent text-white border border-gray-700 rounded-xl p-3 resize-none focus:outline-none focus:border-[#1DA1F2] transition-all"
          />

          <div className="flex justify-end mt-5">
            <button
              type="submit"
              className="px-6 py-2 bg-[#1DA1F2] hover:bg-[#1991DA] rounded-full text-white font-semibold transition-all"
            >
              Update Comment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateComment;
