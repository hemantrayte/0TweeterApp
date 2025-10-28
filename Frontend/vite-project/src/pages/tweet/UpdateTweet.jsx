import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../Api/api";

const UpdateTweet = () => {
  const { tweetId } = useParams();

  const [tweet, setTweet] = useState({
    content: "",
  });

  const navigate = useNavigate();

  const handleInputeChange = (e) => {
    setTweet({
      ...tweet,
      [e.target.name]: e.target.value,
    });
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
      // setMessage(res.data.message);
      console.log(res.data);
      navigate(`/tweet/${tweetId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="content"
          value={tweet.content}
          onChange={handleInputeChange}
        />
        <button>Update Tweet</button>
      </form>
    </div>
  );
};

export default UpdateTweet;
