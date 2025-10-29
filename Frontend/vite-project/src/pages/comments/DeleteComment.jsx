import React from "react";
import api from "../../Api/api";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const DeleteComment = () => {
  const { commentId } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const res = await api.delete(`/comments/c/${commentId}`);
      console.log(res.data.data);
      alert("Comment deleted successfully!");
      navigate(-2); // 👈 Go back to previous page
    } catch (error) {
      console.log("Error deleting comment:", error);
    }
  };

  return (
    <div className="bg-black min-h-screen flex flex-col text-gray-100">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-800 sticky top-0 bg-black/80 backdrop-blur">
        <button
          onClick={() => navigate(-1)}
          className="mr-4 text-gray-400 hover:text-white"
        >
          <FaArrowLeft size={18} />
        </button>
        <h2 className="text-xl font-bold">Delete Comment</h2>
      </div>

      {/* Confirmation Section */}
      <div className="max-w-md mx-auto mt-24 bg-black border border-gray-800 p-6 rounded-2xl shadow-md text-center">
        <h1 className="text-lg font-semibold mb-4">
          Are you sure you want to delete this comment?
        </h1>
        <p className="text-gray-400 mb-6">This action cannot be undone.</p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={handleDelete}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-full font-semibold text-white transition-all"
          >
            Delete
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 border border-gray-600 text-gray-300 hover:bg-gray-800 rounded-full font-semibold transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteComment;
