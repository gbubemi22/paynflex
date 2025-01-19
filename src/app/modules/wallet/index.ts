import express from "express";
import {
  Create,
  ListOneWallet,
  TopUpWallet,
  VerifyTopUp,
} from "./controller.js";
import { verifyToken } from "../../middleware/auth.js";

const router = express.Router();

router.route("/").get(verifyToken, Create);
router.route("/list-one").get(verifyToken, ListOneWallet);
router.route("/top-up").post(verifyToken, TopUpWallet);
router.route("/verify/:reference").get(verifyToken, VerifyTopUp);

export default router;
