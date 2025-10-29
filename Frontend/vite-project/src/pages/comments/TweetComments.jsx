import React, { useEffect, useState } from "react";
import api from "../../Api/api";
import { useNavigate } from "react-router-dom";

const TweetComments = ({ tweetId }) => {
  const [comments, setComments] = useState([]);

  const navigate = useNavigate();

  const fetchTweetComment = async () => {
    try {
      const res = await api.get(`/comments/comments/${tweetId}`);
      console.log(res.data.data);
      setComments(res.data.data);
    } catch (error) {
      console.log(error, "error during fetch tweet comment");
    }
  };

  const handleClick = () => {
    navigate(`/comment/create/${tweetId}`);
  };

  useEffect(() => {
    fetchTweetComment();
  }, []);

  return (
    <>
      <div>
        {comments.map((comment) => (
          <div key={comment._id}>
            <button onClick={handleClick}>Add Comment</button>
            <h1>{comment.content}</h1>
            <h1>{comment.owner.username}</h1>
            <img src={comment.owner.avatar} alt="" />
            <h4>{comment.createdAt}</h4>
          </div>
        ))}
      </div>
    </>
  );
};

export default TweetComments;
