import express from "express";
import { verifyToken } from "../../middleware/auth.js";
import {
  getYearlyTransactionSummaryController,
  ListOne,
  ListTrx,
} from "./controller.js";

const router = express.Router();

router.route("/stat").get(verifyToken, getYearlyTransactionSummaryController);

router.route("/").get(verifyToken, ListTrx);
router.route("/:transactionId").get(verifyToken, ListOne);


export default router;
