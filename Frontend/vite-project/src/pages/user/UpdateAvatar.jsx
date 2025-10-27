import React, { useState } from "react";
import api from "../../Api/api";
import { useNavigate } from "react-router-dom";
import { FaCamera, FaArrowLeft } from "react-icons/fa";

const UpdateAvatar = () => {
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!avatar) {
      setMessage("Please select an image first!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("avatar", avatar);

      const token = localStorage.getItem("accessToken");

      await api.patch("/users/update-user/avatar", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Avatar updated successfully!");
      setTimeout(() => navigate("/user/current-user"), 1500);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Failed to update avatar. Try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-black transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-8 text-center transition-all duration-300">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-5 left-5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <FaArrowLeft size={20} />
        </button>

        {/* Header */}
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center justify-center gap-2">
          <FaCamera className="text-blue-500" /> Update Avatar
        </h1>

        {/* Avatar Preview */}
        <div className="relative mx-auto mb-6 w-32 h-32">
          <img
            src={
              preview ||
              "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
            }
            alt="Avatar Preview"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-md"
          />
          <label
            htmlFor="avatarUpload"
            className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 p-2 rounded-full cursor-pointer shadow-md"
          >
            <FaCamera className="text-white" />
          </label>
          <input
            type="file"
            id="avatarUpload"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl font-semibold transition duration-200"
          >
            Save Avatar
          </button>
        </form>

        {/* Message */}
        {message && (
          <p
            className={`mt-4 font-medium ${
              message.includes("successfully")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default UpdateAvatar;
