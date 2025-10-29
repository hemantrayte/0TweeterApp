import React, { useState } from "react";
import api from "../../Api/api";
import { useNavigate, useParams } from "react-router-dom";

const CreateComment = () => {
  const [addTweet, setAddTweet] = useState("");

  const { tweetId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(
        `/comments/${tweetId}`,
        { content: addTweet },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(res.data);
      navigate(`/tweet/${tweetId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Add Comment</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={addTweet}
          onChange={(e) => setAddTweet(e.target.value)}
          type="text"
          placeholder="add comment"
        />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
};

export default CreateComment;
