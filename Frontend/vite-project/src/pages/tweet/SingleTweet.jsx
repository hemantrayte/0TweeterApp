import React from "react";
import { useParams } from "react-router-dom";


const SingleTweet = () => {

  const {id} = useParams()

  const fetchSingleTweet = async() => {
    try {
      const res = await
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <h1>Single tweet</h1>
    </div>
  );
};

export default SingleTweet;
