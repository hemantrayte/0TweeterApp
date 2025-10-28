import React, { useEffect, useState } from "react";
import api from "../../Api/api"; //

const AllTweets = () => {
  const [tweet, setTweet] = useState([]);
  const [message, setMessage] = useState("");

  const fetchAllTweets = async () => {
    try {
      const res = await api.get("/tweets");
      console.log(res.data.data);
      setTweet(res.data.data);
      setMessage(res.data.message || "Tweets fetched successfully");
    } catch (error) {
      console.log(error.res?.data);
      setMessage(error.res?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchAllTweets();
  }, []);

  return (
    <>
      <div>
        {tweet.map((tweet) => (
          <div key={tweet._id}>
            <img src={tweet.image} alt="" />
            <h1>{tweet.content}</h1>
            <img src={tweet.owner.avatar} alt="" />
            <h3>{tweet.owner.username}</h3>
            <h4>{tweet.createdAt}</h4>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllTweets;
