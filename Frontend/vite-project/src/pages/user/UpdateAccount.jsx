import React, { useEffect, useState } from "react";
import api from "../../Api/api";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const UpdateAccount = () => {
  const [userData, setUserData] = useState({
    email: "",
    fullName: "",
  });

  const [message, setMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchCurrentUser = async () => {
    try {
      const res = await api.get("/users/current-user");
      setUserData(res.data.data);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to fetch user data",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    try {
      const res = await api.patch("/users/update-user", userData, {
        headers: { "Content-Type": "application/json" },
      });

      setMessage({
        type: "success",
        text: res.data.message || "User updated successfully!",
      });

      setTimeout(() => {
        navigate("/user/current-user");
      }, 1500);
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Error occurred while updating the user",
      });
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <div className="max-w-xl mx-auto min-h-screen bg-black text-white border-x border-gray-800">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-800 sticky top-0 bg-black/80 backdrop-blur">
        <button
          onClick={() => navigate(-1)}
          className="mr-4 text-gray-400 hover:text-white"
        >
          <FaArrowLeft size={18} />
        </button>
        <h2 className="text-xl font-bold">Edit Profile</h2>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={userData.fullName}
            onChange={handleInputChange}
            className="w-full bg-transparent border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter full name"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            className="w-full bg-transparent border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter email"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 mt-8">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-full transition"
          >
            Save Changes
          </button>

          <button
            onClick={() => navigate("/user/update/avatar")}
            type="button"
            className="border border-gray-600 text-gray-300 hover:bg-gray-800 py-2 rounded-full transition"
          >
            Update Avatar
          </button>

          <button
            onClick={() => navigate("/user/update/password")}
            type="button"
            className="border border-gray-600 text-gray-300 hover:bg-gray-800 py-2 rounded-full transition"
          >
            Change Password
          </button>
        </div>

        {/* Message */}
        {message.text && (
          <p
            className={`text-center mt-4 ${
              message.type === "success" ? "text-green-500" : "text-red-500"
            }`}
          >
            {message.text}
          </p>
        )}
      </form>
    </div>
  );
};

export default UpdateAccount;
