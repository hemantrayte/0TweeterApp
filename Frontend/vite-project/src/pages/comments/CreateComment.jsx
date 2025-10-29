import React, { useState } from "react";
import api from "../../Api/api";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const CreateComment = () => {
  const [addTweet, setAddTweet] = useState("");
  const { tweetId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(
        `/comments/${tweetId}`,
        { content: addTweet },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(res.data);
      navigate(`/tweet/${tweetId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-800 sticky top-0 bg-black/80 backdrop-blur">
        <button
          onClick={() => navigate(-1)}
          className="mr-4 text-gray-400 hover:text-white"
        >
          <FaArrowLeft size={18} />
        </button>
        <h2 className="text-xl font-bold">Add Comment</h2>
      </div>

      {/* Comment Form */}
      <div className="max-w-2xl mx-auto w-full border-x border-gray-800 p-5">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <textarea
            value={addTweet}
            onChange={(e) => setAddTweet(e.target.value)}
            placeholder="Post your reply..."
            className="w-full bg-black text-white placeholder-gray-500 border border-gray-700 rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#1DA1F2]"
            rows="4"
          />

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#1DA1F2] hover:bg-[#1991DA] text-white font-semibold px-5 py-2 rounded-full transition-all"
            >
              Reply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateComment;
