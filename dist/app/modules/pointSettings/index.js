import express from "express";
import { Create, List, ListOne, Remove, Update } from "./controller.js";
const router = express.Router();
router.route("/").post(Create);
router.route("/").get(List);
router.route("/:id").get(ListOne);
router.route("/:id").delete(Remove);
router.route("/:id").patch(Update);
export default router;
