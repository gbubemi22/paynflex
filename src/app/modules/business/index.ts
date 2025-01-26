import express from "express";
import {
  Create,
  List,
  ListOne,
  Remove,
  Update,
  UpdateImage,
} from "./controller.js";
import { AdminVerifyToken } from "../../middleware/admin.auth.js";

const router = express.Router();

router.route("/update-images/:id").put(AdminVerifyToken, UpdateImage);

router.route("/").post(AdminVerifyToken, Create);

router.route("/").get(AdminVerifyToken, List);

router.route("/:id").get(AdminVerifyToken, ListOne);

router.route("/:id").patch(AdminVerifyToken, Update);

router.route("/:id").delete(AdminVerifyToken, Remove);

export default router;

console.log(new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString());
