import { Router } from "express";
import { VerifyJwt } from "../middlewares/auth.middleware.js";
import {
  getLikedTweets,
  toggleCommentLike,
  toggleTweetLike,
} from "../controllers/like.controller.js";

const router = Router();
router.use(VerifyJwt);

router.route("/toggle/t/:tweetId").post(toggleTweetLike);
router.route("/toggle/c/:commentId").post(toggleCommentLike);

router.route("/liketweets").get(getLikedTweets);

export default router;
