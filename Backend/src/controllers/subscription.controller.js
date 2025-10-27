import { Subscription } from "../models/followers.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

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

const unfollowUser = asyncHandler(async (req, res) => {
  const followerId = req.user._id;
  const profileId = req.params.userId;

  const follow = await Subscription.findOneAndDelete({
    follower: followerId,
    profile: profileId,
  });

  if (!follow) {
    throw new ApiError(404, "You are not following this user");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "User unfollowed successfully"));
});

const getFollowers = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const followers = await Subscription.find({ profile: userId })
    .populate("follower", "name email avatar")
    .lean();

  return res
    .status(200)
    .json(new ApiResponse(200, followers, "Followers fetched successfully"));
});

const getFollowing = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const following = await Subscription.find({ follower: userId })
    .populate("profile", "name email avatar")
    .lean();

  return res
    .status(200)
    .json(
      new ApiResponse(200, following, "Following list fetched successfully")
    );
});

export { followUser, unfollowUser, getFollowers, getFollowing };
