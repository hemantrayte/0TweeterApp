import React, { useState } from "react";

const Signup = () => {
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    password: "",
    fullName: "",
  });

  const [avatar, setAvatar] = useState(null);

  const handleInputeChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    if (e.target.name === "avatar") {
      setAvatar(e.target.file[0]);
    }
  };

  const handleSubmit = async () => {};

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
      </form>
    </div>
  );
};

export default Signup;
