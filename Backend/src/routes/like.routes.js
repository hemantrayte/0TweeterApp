import { Router } from "express";
import { VerifyJwt } from "../middlewares/auth.middleware";
import {
  getLikedTweets,
  toggleCommentLike,
  toggleTweetLike,
} from "../controllers/like.controller";

const router = Router();
router.use(VerifyJwt);

router.route("/toggle/t/:tweetId").post(toggleTweetLike);
router.route("/toggle/c/:commentId").post(toggleCommentLike);

router.get(getLikedTweets);

export default router;
