import { Subscription } from "../models/followers.model.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// 🟢 Follow a user
const followUser = asyncHandler(async (req, res) => {
  const followerId = req.user?._id;
  const { userId } = req.params;

  if (followerId.toString() === userId) {
    throw new ApiError(400, "You cannot follow yourself");
  }

  const userToFollow = await User.findById(userId);
  if (!userToFollow) {
    throw new ApiError(404, "User not found");
  }

  const existingFollow = await Subscription.findOne({
    follower: followerId,
    profile: userId,
  });

  if (existingFollow) {
    throw new ApiError(400, "Already following this user");
  }

  // ✅ Create follow record
  await Subscription.create({
    follower: followerId,
    profile: userId,
  });

  // ✅ Update counts
  await User.findByIdAndUpdate(followerId, { $inc: { followingCount: 1 } });
  await User.findByIdAndUpdate(userId, { $inc: { followersCount: 1 } });

  return res
    .status(200)
    .json(new ApiResponse(200, "User followed successfully"));
});

// 🔴 Unfollow a user
const unfollowUser = asyncHandler(async (req, res) => {
  const followerId = req.user?._id;
  const { userId } = req.params;

  if (!followerId) throw new ApiError(401, "Unauthorized");
  if (!userId) throw new ApiError(400, "User ID is required");

  const existingFollow = await Subscription.findOneAndDelete({
    follower: followerId,
    profile: userId,
  });

  if (!existingFollow) {
    throw new ApiError(400, "You are not following this user");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "User unfollowed successfully"));
});

// 🧍 Get followers of a user
const getFollowers = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) throw new ApiError(400, "User ID is required");

  const followers = await Subscription.find({ profile: userId })
    .populate("follower", "username avatar fullName")
    .lean();

  return res
    .status(200)
    .json(new ApiResponse(200, followers, "Followers fetched successfully"));
});

// 🧍‍♀️ Get following list of a user
const getFollowing = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) throw new ApiError(400, "User ID is required");

  const following = await Subscription.find({ follower: userId })
    .populate("profile", "username avatar fullName")
    .lean();

  return res
    .status(200)
    .json(new ApiResponse(200, following, "Following fetched successfully"));
});

export { followUser, unfollowUser, getFollowers, getFollowing };
