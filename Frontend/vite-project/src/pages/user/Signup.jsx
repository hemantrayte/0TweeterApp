import React, { useState } from "react";
import api from "../../Api/api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    password: "",
    fullName: "",
  });

  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(null);
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    if (e.target.name === "avatar") {
      setAvatar(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("fullName", userData.fullName);
      data.append("email", userData.email);
      data.append("password", userData.password);
      data.append("username", userData.username);
      if (avatar) data.append("avatar", avatar);

      const res = await api.post("/users/register", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(res.data.message || "User registered successfully!");
      console.log("User registered successfully!");

      setUserData({
        fullName: "",
        email: "",
        username: "",
        password: "",
      });
      setAvatar(null);

      navigate("/login");
    } catch (error) {
      console.log(error);
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f8ff]">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        {/* Twitter logo */}
        <div className="text-center mb-6">
          <svg
            viewBox="0 0 24 24"
            className="w-10 h-10 mx-auto text-[#1DA1F2]"
            fill="currentColor"
          >
            <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775a4.932 4.932 0 002.163-2.724 9.864 9.864 0 01-3.127 1.184A4.918 4.918 0 0016.616 3c-2.73 0-4.944 2.214-4.944 4.944 0 .39.045.765.127 1.124C7.728 8.91 4.1 6.884 1.67 3.905a4.932 4.932 0 00-.666 2.482c0 1.71.871 3.213 2.188 4.096a4.904 4.904 0 01-2.238-.616v.06c0 2.385 1.693 4.374 3.946 4.828a4.935 4.935 0 01-2.224.084c.63 1.953 2.445 3.377 4.6 3.419A9.874 9.874 0 010 19.54a13.945 13.945 0 007.548 2.209c9.056 0 14.01-7.496 14.01-13.986 0-.21 0-.423-.016-.634A9.936 9.936 0 0024 4.59z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mt-2">
            Create your account
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full name"
            value={userData.fullName}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#1DA1F2]"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userData.email}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#1DA1F2]"
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={userData.username}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#1DA1F2]"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={userData.password}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#1DA1F2]"
            required
          />

          <div>
            <label className="block text-gray-700 text-sm mb-2 font-medium">
              Profile Avatar
            </label>
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-600 border border-gray-300 rounded-full cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1DA1F2]"
              required
            />

            {avatar && (
              <div className="flex justify-center mt-4">
                <img
                  src={URL.createObjectURL(avatar)}
                  alt="Preview"
                  className="w-20 h-20 rounded-full object-cover border-2 border-[#1DA1F2]"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#1DA1F2] text-white rounded-full font-semibold hover:bg-[#0d8ae5] transition duration-200"
          >
            Sign up
          </button>
        </form>

        {message && (
          <p
            className={`text-center mt-4 text-sm ${
              message.includes("successfully")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-[#1DA1F2] font-medium hover:underline cursor-pointer"
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
