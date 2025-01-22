import express from "express";
import { Create, Login } from "./controller.js";

const router = express.Router();

router.route("/create").post(Create);
router.route("/login").post(Login);

export default router;
