import React, { useState } from "react";
import api from "../../Api/api";
import { useNavigate } from "react-router-dom";

const CreateTweet = () => {
  const [tweet, setTweet] = useState({
    content: "",
  });

  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

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
      if (image) data.append("image", image);

      const res = await api.post("/tweets/create", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(res.data.message || "Tweet created successfully!");
      setTweet({ content: "" });
      setImage(null);
      navigate("/tweet");
    } catch (error) {
      console.log(error);
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center bg-black text-white min-h-screen">
      <div className="w-full max-w-xl border-x border-gray-700">
        {/* Header */}
        <div className="sticky top-0 bg-black border-b border-gray-700 p-4">
          <h2 className="text-xl font-semibold">Create Post</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4">
          <textarea
            name="content"
            placeholder="What's happening?"
            value={tweet.content}
            onChange={handleChange}
            className="bg-black text-white text-lg resize-none border-none focus:outline-none"
            rows="3"
            required
          />

          {/* Image preview */}
          {image && (
            <div className="relative">
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="rounded-2xl border border-gray-700"
              />
              <button
                type="button"
                className="absolute top-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded-full text-sm"
                onClick={() => setImage(null)}
              >
                ✕
              </button>
            </div>
          )}

          <div className="flex items-center justify-between border-t border-gray-700 pt-3">
            <label className="cursor-pointer text-blue-400 hover:text-blue-300">
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              📸 Add Image
            </label>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full px-6 py-2"
            >
              Post
            </button>
          </div>
        </form>

        {/* Message */}
        {message && (
          <div className="text-center text-sm text-green-400 p-2">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateTweet;
