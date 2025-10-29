import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../Api/api";

const UpdateComment = () => {
  const [updateComment, setUpdateComment] = useState("");

  const { commentId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.patch(
        `/comments/c/${commentId}`,
        { content: updateComment },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(res.data.data);
      navigate(`/comment/c/${commentId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={updateComment}
          onChange={(e) => setUpdateComment(e.target.value)}
        />
        <button type="submit">Update Tweet</button>
      </form>
    </div>
  );
};

export default UpdateComment;
