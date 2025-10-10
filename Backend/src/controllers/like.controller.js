import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { Like } from "../models/like.model";

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user?._id;

  if (!commentId) {
    throw new ApiError(404, "coment not found");
  }

  const existingLike = await getLikedTweets.findOne({
    comment: commentId,
    likedBy: userId,
  });

  if (existingLike) {
    await existingLike.deleteOne();
    return res.status(200).json({
      success: true,
      message: "Comment removed Like",
    });
  } else {
    const newLike = await Like.create({
      comment: commentId,
      likedBy: userId,
    });

    return res.status(201).json({
      success: true,
      message: "Comment liked",
      like: newLike,
    });
  }
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  const userId = req.user?._id;

  if (!tweetId) {
    throw new ApiError(404, "tweet not found");
  }

  const existingLike = await Like.findOne({
    tweet: tweetId,
    likedBy: userId,
  });

  if (existingLike) {
    await existingLike.deleteOne();
    return res.status(200).json(new ApiResponse(200, "Tweet Like removed"));
  } else {
    const newLike = await Like.create({
      tweet: tweetId,
      likedBy: userId,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, { like: newLike }, "Tweet Liked"));
  }
});

const getLikedTweets = asyncHandler(async (req, res) => {});

export { toggleCommentLike, getLikedTweets, toggleTweetLike };
