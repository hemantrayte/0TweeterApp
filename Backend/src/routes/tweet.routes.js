import { Router } from "express";
import { VerifyJwt } from "../middlewares/auth.middleware.js";
import { allTweet, createTweet } from "../controllers/tweet.controller";

const router = Router();
router.use(VerifyJwt);

router.route("/").post(createTweet);
router.route("/").get(allTweet);

export default router;
