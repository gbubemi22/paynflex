import express from "express";
import { verifyToken } from "../../middleware/auth.js";
import { Create, InitiateResetPin, VerifyPin, VerifyPinRest, } from "./controller.js";
const router = express.Router();
router.route("/").post(verifyToken, Create);
router.route("/verify-pin").post(verifyToken, VerifyPin);
router.route("/rest-pin").post(InitiateResetPin);
router.route("/change-pin").post(VerifyPinRest);
export default router;
