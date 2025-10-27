import React, { useEffect, useState } from "react";
import api from "../../Api/api";
import { useNavigate } from "react-router-dom";

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
    setMessage({ type: "", text: "" }); // reset message

    try {
      const res = await api.patch("/users/update-user", userData, {
        headers: { "Content-Type": "application/json" },
      });

      setMessage({
        type: "success",
        text: res.data.message || "User updated successfully!",
      });

      // redirect after short delay
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
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="fullName"
            value={userData.fullName}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Update Account</button>
      </form>
      <button onClick={() => navigate("/user/update/avatar")}>
        Update Avatar
      </button>
      <button onClick={() => navigate("/user/update/password")}>
        Update Password
      </button>
    </div>
  );
};

export default UpdateAccount;
