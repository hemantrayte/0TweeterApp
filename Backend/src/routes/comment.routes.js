import { Router } from "express";
import { VerifyJwt } from "../middlewares/auth.middleware";
import {
  createComment,
  deleteComment,
  updateComment,
} from "../controllers/comment.controller";

const router = Router();
router.use(VerifyJwt);

router.route("/:tweetId").post(createComment);
router.route("/c/:commentId").patch(updateComment);
router.route("/c/:commentId").delete(deleteComment);

export default router;
