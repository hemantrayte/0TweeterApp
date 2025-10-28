import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../Api/api";

const SingleTweet = () => {
  const { tweetId } = useParams();

  const [tweet, setTweet] = useState("");

  const fetchSingleTweet = async () => {
    try {
      const res = await api.get(`/tweets/${tweetId}`);
      console.log(res.data.data);
      setTweet(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSingleTweet();
  }, []);
  return (
    <div>
      {
        <div>
          <h1>{tweet.content}</h1>
          <img src={tweet.image} alt="" />
          <h1>{tweet?.owner?.username}</h1>
          <img src={tweet?.owner?.avatar} alt="" />
          <h5>{tweet.createdAt}</h5>
          <Link to={`/tweet/update/${tweet._id}`}>
            <button>Update tweet</button>
          </Link>
          <Link to={`/tweet/delete/${tweet._id}`}>
            <button>Delete Tweet</button>
          </Link>
        </div>
      }
    </div>
  );
};

export default SingleTweet;
