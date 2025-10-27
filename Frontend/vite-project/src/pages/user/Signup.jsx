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

  const handleInputeChange = (e) => {
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
      navigate("/login");
    } catch (error) {
      console.log(error);
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <h1>Sign up User</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="email"
            placeholder="email"
            value={userData.email}
            onChange={handleInputeChange}
          />
          <input
            type="text"
            name="username"
            placeholder="username"
            value={userData.username}
            onChange={handleInputeChange}
          />
          <input
            type="text"
            name="password"
            placeholder="password"
            value={userData.password}
            onChange={handleInputeChange}
          />
          <input
            type="text"
            name="fullName"
            placeholder="fullName"
            value={userData.fullName}
            onChange={handleInputeChange}
          />
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-sm"
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Signup;
