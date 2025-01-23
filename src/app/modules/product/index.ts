import express from "express";
import { Create, List, ListOne } from "./controller.js";

const router = express.Router();

router.route("/").post(Create);

router.route("/").get(List);

router.route("/:id").get(ListOne);

export default router;
