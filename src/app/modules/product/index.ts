import express from "express";
import { Create, List, ListOne } from "./controller.js";
import { AdminVerifyToken } from "../../middleware/admin.auth.js";

const router = express.Router();

router.route("/").post(AdminVerifyToken, Create);

router.route("/").get(AdminVerifyToken, List);

router.route("/:id").get(AdminVerifyToken, ListOne);

export default router;
