import express from "express";
import { joiValidator } from "../../utils/validator.js";
import validation from "../../utils/validator.js";
import { Create, SendVerificationOtpToPhone, VerifyOtpVerification, Login, RequestPasswordReset, VerifyOtpForPasswordReset, UpdateUserProfile, GetProfile, } from "./controller.js";
import { verifyToken } from "../../middleware/auth.js";
const router = express.Router();
router.route("/register").post(joiValidator(validation.create), Create);
router
    .route("/send-otp-phone")
    .post(joiValidator(validation.sendVerificationOtpToPhone), SendVerificationOtpToPhone);
router
    .route("/verify-phone")
    .post(joiValidator(validation.VerifyOtpVerification), VerifyOtpVerification);
router.route("/login").post(joiValidator(validation.login), Login);
router
    .route("/forget-password")
    .post(joiValidator(validation.requestPasswordReset), RequestPasswordReset);
router
    .route("/reset-password")
    .patch(joiValidator(validation.VerifyOtpForPasswordReset), VerifyOtpForPasswordReset);
router.route("/update-profile").patch(verifyToken, UpdateUserProfile);
router.route("/profile").get(verifyToken, GetProfile);
export default router;
