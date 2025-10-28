import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../Api/api";
import { FaArrowLeft } from "react-icons/fa";

const UpdateTweet = () => {
  const { tweetId } = useParams();
  const [tweet, setTweet] = useState({ content: "" });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setTweet({ ...tweet, [e.target.name]: e.target.value });
  };

  const fetchSingleTweet = async () => {
    try {
      const res = await api.get(`/tweets/id/${tweetId}`);
      setTweet(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSingleTweet();
  }, [tweetId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.patch(
        `/tweets/${tweetId}`,
        { content: tweet.content },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(res.data);
      navigate(`/tweet/${tweetId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-xl flex items-center border-b border-gray-800 px-4 py-3 sticky top-0 bg-black/80 backdrop-blur">
        <button
          onClick={() => navigate(-1)}
          className="mr-4 text-gray-400 hover:text-white"
        >
          <FaArrowLeft size={18} />
        </button>
        <h1 className="text-lg font-semibold">Edit Tweet</h1>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl flex flex-col gap-4 px-4 mt-6"
      >
        <textarea
          name="content"
          value={tweet.content}
          onChange={handleInputChange}
          placeholder="What's happening?"
          className="w-full bg-black text-white border-b border-gray-700 focus:border-[#1DA1F2] focus:outline-none text-lg p-3 resize-none"
          rows="4"
        />

        <div className="flex justify-end mt-3">
          <button
            type="submit"
            className="bg-[#1DA1F2] text-white font-semibold px-6 py-2 rounded-full hover:bg-[#1a8cd8] transition-colors"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTweet;
