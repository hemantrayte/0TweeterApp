import { Tweet } from "../models/tweet.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloundinary.js";

const createTweet = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const userId = req.user._id;

  if (!content) {
    throw new ApiError(400, "Content is required");
  }

  // Assuming your image upload field name is 'image'
  const imageLocalPath = req.files?.image?.[0]?.path;

  if (!imageLocalPath) {
    throw new ApiError(400, "Tweet image is required");
  }

  const image = await uploadOnCloudinary(imageLocalPath);

  if (!image || !image.url) {
    throw new ApiError(400, "Image upload failed");
  }

  const tweet = await Tweet.create({
    content,
    image: image.url,
    owner: userId,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, tweet, "Tweet created successfully"));
});

const updateTweet = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const userId = req.user._id;
  const { tweetId } = req.params;

  if (!content) {
    throw new ApiError(400, "Content is required");
  }

  if (!tweetId) {
    throw new ApiError(404, "Tweet id is required");
  }

  const tweet = await Tweet.findOneAndUpdate(
    { _id: tweetId, owner: userId },
    { $set: { content: content } },
    { new: true }
  );

  if (!tweet) {
    throw new ApiError(404, "Tweet not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, tweet, "Tweet updated successfully"));
});

const deleteTweet = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { tweetId } = req.params;

  if (!userId) {
    throw new ApiError(404, "User Not found");
  }

  if (!tweetId) {
    throw new ApiError(404, "Tweet not found");
  }

  const tweet = await Tweet.findOneAndDelete({
    _id: tweetId,
    owner: userId,
  });

  if (!tweet) {
    throw new ApiError(404, "Tweet not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Tweet deleted successfully"));
});

const allTweet = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(400, "User Id is required");
  }
  const tweet = await Tweet.find({})
    .populate("owner", "username fullName avatar")
    .sort({ createdAt: -1 });

  return res.status(200).json(new ApiResponse(200, tweet, "All Tweets"));
});

const userTweets = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(400, "User Id is required");
  }

  const tweets = await Tweet.find({ owner: userId })
    .populate("owner", "username fullName avatar") // replace 'user' with your actual field name in Tweet schema
    .sort({ createdAt: -1 }); // optional: latest tweets first

  return res
    .status(200)
    .json(new ApiResponse(200, tweets, "Tweet fetched successfully"));
});

export { createTweet, updateTweet, deleteTweet, allTweet, userTweets };
