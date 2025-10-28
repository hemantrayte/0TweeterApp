import React, { useState } from "react";
import api from "../../Api/api";
import { useNavigate } from "react-router-dom";

const CreateTweet = () => {
  const [tweet, setTweet] = useState({
    content: "",
  });

  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setTweet({
      ...tweet,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    if (e.target.name === "image") {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("content", tweet.content);
      data.append("image", image);

      //Use Api helper insted of axios
      const res = await api.post("/tweets/create", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(res.data.data);
      setMessage(res.data.message || "Tweet created successfully!");

      setTweet({
        content: "",
      });

      navigate("/tweet");
    } catch (error) {
      console.log(error);
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="content"
          value={tweet.content}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
        <button type="submit">Create Tweet</button>
      </form>
    </div>
  );
};

export default CreateTweet;
