import { verifyToken } from "../../middleware/auth.js";
import express from "express";
import { List, ListOne } from "./controller.js";
const router = express.Router();
router.route("/").get(verifyToken, List);
router.route("/:id").get(verifyToken, ListOne);
export default router;
