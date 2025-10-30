import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../Api/api";

const UnfollowUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleUnfollow = async () => {
    try {
      setLoading(true);
      const res = await api.delete(`/unfollow/${userId}`);
      console.log(res.data);
      alert("User unfollowed successfully!");
      navigate("/"); // redirect anywhere you prefer
    } catch (error) {
      console.error("Error unfollowing user:", error);
      alert("Failed to unfollow user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-gray-100">
      <div className="bg-[#16181C] border border-gray-800 p-6 rounded-2xl shadow-md w-[90%] max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-white">Unfollow User</h1>
        <p className="text-gray-400 mb-6">
          Are you sure you want to unfollow this user?
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleUnfollow}
            disabled={loading}
            className="bg-[#1D9BF0] hover:bg-[#1A8CD8] text-white px-5 py-2 rounded-full font-semibold transition disabled:opacity-50"
          >
            {loading ? "Unfollowing..." : "Unfollow"}
          </button>

          <button
            onClick={() => navigate(-1)}
            className="border border-gray-700 hover:bg-gray-800 text-gray-300 px-5 py-2 rounded-full font-semibold transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnfollowUser;
