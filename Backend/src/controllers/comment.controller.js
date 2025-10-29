import { Comment } from "../models/comment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Tweet } from "../models/tweet.model.js";

const createComment = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const { tweetId } = req.params;
  const userId = req.user?._id;

  if (!content) {
    throw new ApiError(400, "Comment content is required");
  }

  if (!tweetId) {
    throw new ApiError(400, "Tweet ID is required");
  }

  const comment = await Comment.create({
    content: content,
    tweet: tweetId,
    owner: userId,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, comment, "Comment added successfully"));
});

const updateComment = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const userId = req.user?._id;
  const { commentId } = req.params;

  if (!content) {
    throw new ApiError(400, "Comment content is required");
  }

  if (!commentId) {
    throw new ApiError(400, "Comment ID is required");
  }

  const comment = await Comment.findOneAndUpdate(
    { _id: commentId, owner: userId },
    { $set: { content: content } },
    { new: true }
  );

  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, comment, "Comment updated successfully"));
});

const deleteComment = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { commentId } = req.params;

  if (!commentId) {
    throw new ApiError(400, "Comment Id is required");
  }

  const comment = await Comment.findOneAndDelete({
    _id: commentId,
    owner: userId,
  });

  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Comment deleted successfully"));
});

const getTweetComment = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;

  // Check if tweet exists
  const tweet = await Tweet.findById(tweetId);

  if (!tweet) {
    throw new ApiError(404, "Tweet not found");
  }

  // Get all comments for this tweet
  const comments = await Comment.find({ tweet: tweetId })
    .populate("owner", "username avatar") // populate author info
    .sort({ createdAt: -1 }); // latest comments first

  return res
    .status(200)
    .json(new ApiResponse(200, comments, "Comments fetched successfully"));
});

export { createComment, updateComment, deleteComment, getTweetComment };
