import { Router } from "express";
import { VerifyJwt } from "../middlewares/auth.middleware.js";
import {
  createComment,
  deleteComment,
  getTweetComment,
  updateComment,
} from "../controllers/comment.controller.js";

const router = Router();
router.use(VerifyJwt);

router.route("/:tweetId").post(createComment);
router.route("/c/:commentId").patch(updateComment);
router.route("/c/:commentId").delete(deleteComment);
router.get("/:tweetId/comments", getTweetComment);

export default router;
