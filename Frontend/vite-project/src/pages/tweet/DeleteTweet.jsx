import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../Api/api";
const DeleteTweet = () => {
  const { tweetId } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const res = await api.delete(`/tweets/${tweetId}`);
      console.log(res.data);
      navigate(`/tweet`);
    } catch (error) {
      console.log(error, "");
    }
  };
  return (
    <div>
      <h1>you really delete this tweet</h1>
      <button onClick={handleDelete}>Delete Tweet</button>
      <button>Cancel</button>
    </div>
  );
};

export default DeleteTweet;
