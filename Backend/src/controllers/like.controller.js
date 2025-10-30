import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Like } from "../models/like.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

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
  try {
    console.log("🔹 Toggle Like Request received");
    console.log("🔹 Tweet ID:", req.params.tweetId);
    console.log("🔹 User:", req.user?._id);

    const { tweetId } = req.params;
    const userId = req.user?._id;

    if (!tweetId) throw new ApiError(404, "Tweet ID missing");
    if (!userId) throw new ApiError(401, "User not authenticated");

    const existingLike = await Like.findOne({
      tweet: tweetId,
      likedBy: userId,
    });
    console.log("🔹 Existing Like:", existingLike);

    if (existingLike) {
      await existingLike.deleteOne();
      return res.status(200).json(new ApiResponse(200, "Tweet Like removed"));
    }

    const newLike = await Like.create({ tweet: tweetId, likedBy: userId });
    console.log("✅ New Like created:", newLike);

    return res
      .status(200)
      .json(new ApiResponse(200, { like: newLike }, "Tweet Liked"));
  } catch (error) {
    console.error("❌ Error in toggleTweetLike:", error);
    throw error; // Let asyncHandler handle it
  }
});

const getLikedTweets = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized request, user not found");
  }

  const likedTweets = await Like.find({
    likedBy: userId,
    tweet: { $ne: null }, //only tweet likes
  })
    .populate({
      path: "tweet",
      select: "content createdAt",
      populate: {
        path: "owner",
        select: "fullName username avatar",
      },
    })
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(
      new ApiResponse(200, likedTweets, "Liked videos fetched successfully")
    );
});

export { toggleCommentLike, getLikedTweets, toggleTweetLike };
