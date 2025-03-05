import express from "express";
import { verifyToken } from "../../middleware/auth.js";
import { Create, ListAll, ListOne } from "./controller.js";

const router = express.Router();

router.route("/").post(verifyToken, Create);

router.route("/").get(ListAll);

router.route("/:id").get(ListOne);

export default router;
