import React, { useEffect, useState } from "react";
import api from "../../Api/api";
import { Link, useParams } from "react-router-dom";

const SingleComment = () => {
  const { commentId } = useParams();

  const [comment, setComment] = useState("");
  const [currentUser, setCurrentUser] = useState("");

  const fetchCurrentUser = async () => {
    try {
      const res = await api.get("/users/current-user");
      setCurrentUser(res.data.data);
    } catch (error) {
      console.log("User not fetched", error);
    }
  };

  const fetchSingleComment = async () => {
    try {
      const res = await api.get(`/comments/c/${commentId}`);
      console.log(res.data.data);
      setComment(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSingleComment();
    fetchCurrentUser();
  }, []);

  const isOwner = currentUser?._id === comment?.owner?._id;

  return (
    <div>
      {
        <div>
          <h1>{comment.content}</h1>
          <h1>{comment?.owner?.username}</h1>
          <img src={comment?.owner?.avatar} alt="" />
          <h4>{comment.createdAt}</h4>
          {isOwner && (
            <div>
              <Link to={`/comment/update/${comment._id}`}>Update Comment</Link>
              <Link to={`/comment/delete/${comment._id}`}>Delete Comment</Link>
            </div>
          )}
        </div>
      }
    </div>
  );
};

export default SingleComment;
