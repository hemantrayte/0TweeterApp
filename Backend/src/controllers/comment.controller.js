import { Comment } from "../models/comment.model";
import { asyncHandler } from "../utils/asyncHandler";

const createComment = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const { tweetId } = req.params;
  const userId = req.user?._id;

  if (!content) {
    throw new ApiError(400, "Comment content is required");
  }

  if (!videoId) {
    throw new ApiError(400, "Video ID is required");
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
