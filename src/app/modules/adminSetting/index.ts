import express from "express";
import {
  Create,
  ListAllSettings,
  ListOne,
  Remove,
  UpdateSettings,
} from "./controler.js";

const router = express.Router();

router.route("/").post(Create);

router.route("/:id").get(ListOne);

router.route("/").get(ListAllSettings);

router.route("/:id").patch(UpdateSettings);

router.route("/:id").delete(Remove);

export default router;
