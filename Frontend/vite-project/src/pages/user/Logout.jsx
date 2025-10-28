import React from "react";
import api from "../../Api/api";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

const Logout = () => {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await api.post("/users/logout");

      // ✅ Fix token key typo
      localStorage.removeItem("accessToken");

      // Redirect user to login page
      navigate("/login");
    } catch (error) {
      console.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black transition-colors duration-300">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md p-8 text-center">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
          Are you sure you want to log out?
        </h1>

        <button
          onClick={handleClick}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-red-500 hover:bg-red-600 text-white font-semibold transition duration-200 shadow-md"
        >
          <FaSignOutAlt className="text-lg" />
          Log Out
        </button>

        <button
          onClick={() => navigate(-1)}
          className="mt-4 w-full py-3 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold transition duration-200"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Logout;
