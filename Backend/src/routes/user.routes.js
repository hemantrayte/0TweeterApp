import { Router } from "express";
import {
  changeCurrentPassword,
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUserAvatar,
  updateUserDetails,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { VerifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(VerifyJwt, getCurrentUser);
router.route("/register").post(upload.single("avatar"), registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(VerifyJwt, logoutUser);
router.route("/update-user").patch(VerifyJwt, updateUserDetails);
router.route("/update-user/password").patch(VerifyJwt, changeCurrentPassword);
router
  .route("/update-user/avatar")
  .patch(VerifyJwt, upload.single("avatar"), updateUserAvatar);

export default router;
