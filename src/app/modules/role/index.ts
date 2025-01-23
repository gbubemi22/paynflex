import express from "express";
import { joiValidator } from "../../utils/validator.js";
import validation from "../../utils/validator.js";
import { create } from "domain";
import {
  listAll,
  listOne,
  updateRole,
  deleteRole,
  Create,
} from "./controller.js";

const router = express.Router();

router.route("/").post(Create);

router.route("/").get(listAll);

router.route("/:roleId").get(listOne);

router.route("/:roleId").patch(updateRole);

router.route("/:roleId").delete(deleteRole);

export default router;
