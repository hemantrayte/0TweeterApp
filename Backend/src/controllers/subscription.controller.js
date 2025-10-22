import { asyncHandler } from "../utils/asyncHandler";

const followUser = asyncHandler(async (req, res) => {
  const followerId = req.user._id;
  const profileId = req.params.userId;

  if (followerId.toString() === profileId.toString()) {
    throw new ApiError(400, "You cannot follow yourself");
  }

  // Check if already following
  const alreadyFollow = await Subscription.findOne({
    follower: followerId,
    profile: profileId,
  });

  if (alreadyFollow) {
    throw new ApiError(400, "Already following this user");
  }

  const follow = await Subscription.create({
    follower: followerId,
    profile: profileId,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, follow, "User followed successfully"));
});

export { followUser };
