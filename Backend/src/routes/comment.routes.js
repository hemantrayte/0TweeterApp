import { Router } from "express";
import { VerifyJwt } from "../middlewares/auth.middleware";
import { createComment } from "../controllers/comment.controller";

const router = Router();
router.use(VerifyJwt);

router.route("/:tweetId").post(createComment);
router.route("/c/commentId");

export default router;
