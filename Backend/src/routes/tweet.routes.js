import { Router } from "express";
import { VerifyJwt } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  allTweet,
  createTweet,
  deleteTweet,
  updateTweet,
  userTweets,
} from "../controllers/tweet.controller.js";

const router = Router();

router.use(VerifyJwt);

router
  .route("/create")
  .post(upload.fields([{ name: "image", maxCount: 2 }]), createTweet);
router.route("/").get(allTweet);
router.route("/user/:userId").get(userTweets);
router.route("/:tweetId").patch(updateTweet);
router.route("/:tweetId").patch(deleteTweet);

export default router;
