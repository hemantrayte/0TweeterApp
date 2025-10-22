import { Router } from "express";
import { VerifyJwt } from "../middlewares/auth.middleware.js";
import {
  followUser,
  getFollowers,
  getFollowing,
  unfollowUser,
} from "../controllers/subscription.controller.js";

const router = Router();

router.route("/follow/:userId").post(VerifyJwt, followUser);
router.route("/unfollow/:userId").delete(VerifyJwt, unfollowUser);
router.route("/followers/:userId").get(getFollowers);
router.route("/following/:userId").get(getFollowing);

export default router;
