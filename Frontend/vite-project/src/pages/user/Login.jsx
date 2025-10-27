import React, { useState } from "react";
import api from "../../Api/api";
import { useNavigate, Link } from "react-router-dom";
import { FaTwitter } from "react-icons/fa";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.post("/users/login", userData, {
        headers: { "Content-Type": "application/json" },
      });

      setMessage(res.data.message || "User logged in successfully!");

      if (res.data?.data?.accessToken) {
        localStorage.setItem("accessToken", res.data.data.accessToken);
      }

      setUserData({ email: "", password: "" });
      navigate("/");
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Something went wrong. Please try again"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Section (Twitter Blue Background) */}
      <div className="hidden md:flex md:w-1/2 bg-blue-500 items-center justify-center">
        <FaTwitter className="text-white text-[10rem]" />
      </div>

      {/* Right Section (Form Area) */}
      <div className="flex w-full md:w-1/2 items-center justify-center px-6">
        <div className="max-w-md w-full space-y-6">
          <div className="text-center">
            <FaTwitter className="text-blue-500 text-5xl mx-auto mb-3" />
            <h1 className="text-3xl font-bold text-gray-800 mb-1">
              Sign in to Twitter
            </h1>
          </div>

          {message && (
            <p className="text-center text-red-500 text-sm">{message}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={userData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={userData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white py-3 rounded-full font-semibold hover:bg-blue-600 transition duration-200"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>

          <div className="text-center mt-4 text-gray-600">
            <p>
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-500 hover:underline font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
