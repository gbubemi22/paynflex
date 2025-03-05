import express from "express";
import { joiValidator } from "../../utils/validator.js";
import validation from "../../utils/validator.js";
import { verifyToken } from "../../middleware/auth.js";
import { Code, ConvertPoint, Create, GetProfile, Login, Point, RequestPasswordReset, UpdateProfile, UpdateUserProfile, VerifyEmail, VerifyOtpForPasswordReset, } from "./controller.js";
const router = express.Router();
router.route("/register").post(Create);
// router
//   .route("/send-otp-phone")
//   .post(
//     joiValidator(validation.sendVerificationOtpToPhone),
//     SendVerificationOtpToPhone
//   );
router.route("/verify-email").post(VerifyEmail);
router.route("/point").get(verifyToken, Point);
// router
//   .route("/verify-phone")
//   .post(joiValidator(validation.VerifyOtpVerification), VerifyOtpVerification);
router.route("/login").post(Login);
router
    .route("/forget-password")
    .post(joiValidator(validation.requestPasswordReset), RequestPasswordReset);
router
    .route("/reset-password")
    .patch(joiValidator(validation.VerifyOtpForPasswordReset), VerifyOtpForPasswordReset);
router.route("/code").get(verifyToken, Code);
router.route("/upload-image").patch(verifyToken, UpdateProfile);
router.route("/update-profile").patch(verifyToken, UpdateUserProfile);
router.route("/profile").get(verifyToken, GetProfile);
router.route("/convert-point").post(verifyToken, ConvertPoint);
export default router;
