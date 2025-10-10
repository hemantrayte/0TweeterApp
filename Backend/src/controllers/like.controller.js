import { asyncHandler } from "../utils/asyncHandler";

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user?._id;
});

const toggleTweetLike = asyncHandler(async (req, res) => {});

const getLikedTweets = asyncHandler(async (req, res) => {});
