import { Tweet } from "../models/tweet.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const createTweet = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const userId = req.user._id;

  if (!content) {
    throw new ApiError(400, "All fileds are required");
  }

  const imageLocalPath = req.files?.avatar?.[0]?.path;

  if (!imageLocalPath) {
    throw new ApiError(400, "avatar file is required");
  }

  const image = await uploadOnCloudinary(imageLocalPath);

  if (!image) {
    throw new ApiError(400, "Avatar file is required");
  }

  const tweet = await Tweet.create({
    content: content,
    image: image.url,
    owner: userId,
  });

  return res.status(201).json(new ApiResponse(200, tweet, "Create tweet"));
});

export { createTweet };
