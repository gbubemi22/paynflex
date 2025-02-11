import express from "express";
import { Balance, PurchaseAirtime, PurchaseCableSub, PurchaseData, PurchaseElectricity, VerifyCableSub, } from "./controller.js";
import { verifyToken } from "../../middleware/auth.js";
const router = express.Router();
router.route("/balance").get(Balance);
router.route("/airtime").post(verifyToken, PurchaseAirtime);
router.route("/data").post(verifyToken, PurchaseData);
router.route("/verify").post(verifyToken, VerifyCableSub);
router.route("/cable-sub").post(verifyToken, PurchaseCableSub);
router.route("/electricity").post(verifyToken, PurchaseElectricity);
export default router;
