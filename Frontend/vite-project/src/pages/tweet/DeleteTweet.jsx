import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../Api/api";
import { FaArrowLeft } from "react-icons/fa";

const DeleteTweet = () => {
  const { tweetId } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const res = await api.delete(`/tweets/${tweetId}`);
      console.log(res.data);
      navigate("/tweet");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      {/* Card */}
      <div className="bg-[#16181C] w-full max-w-md rounded-2xl shadow-xl border border-gray-800 p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Delete Tweet?</h1>
        <p className="text-gray-400 mb-6">
          This can’t be undone and it will be removed from your profile, the
          timeline of any accounts that follow you, and from Twitter search
          results.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 transition-colors font-semibold py-2 rounded-full"
          >
            Delete
          </button>

          <button
            onClick={() => navigate(-1)}
            className="border border-gray-600 hover:bg-gray-800 transition-colors py-2 rounded-full font-semibold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTweet;
