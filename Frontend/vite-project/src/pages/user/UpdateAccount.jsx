import React, { useEffect, useState } from "react";
import api from "../../Api/api";
import { useNavigate } from "react-router-dom";
import { FaUserEdit, FaCamera, FaLock } from "react-icons/fa";

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

      setTimeout(() => navigate("/user/current-user"), 1500);
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-black transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-8 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white text-center mb-6 flex items-center justify-center gap-2">
          <FaUserEdit className="text-blue-500" /> Edit Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={userData.fullName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl font-semibold transition"
          >
            Save Changes
          </button>
        </form>

        {message.text && (
          <p
            className={`mt-4 text-center font-medium ${
              message.type === "error"
                ? "text-red-500"
                : "text-green-500 dark:text-green-400"
            }`}
          >
            {message.text}
          </p>
        )}

        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={() => navigate("/user/update/avatar")}
            className="flex items-center justify-center gap-2 w-full border border-gray-300 dark:border-gray-700 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <FaCamera className="text-blue-500" /> Update Avatar
          </button>

          <button
            onClick={() => navigate("/user/update/password")}
            className="flex items-center justify-center gap-2 w-full border border-gray-300 dark:border-gray-700 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <FaLock className="text-blue-500" /> Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateAccount;
