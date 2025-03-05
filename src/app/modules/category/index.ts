import express from "express";
import { Create, ListOne, ListAll, Remove, Update } from "./controller.js";
import { AdminVerifyToken } from "../../middleware/admin.auth.js";

const router = express.Router();

router.route("/").post(AdminVerifyToken, Create);

router.route("/").get(AdminVerifyToken, ListAll);

router.route("/:id").get(AdminVerifyToken, ListOne);

router.route("/:id").patch(AdminVerifyToken, Update);

router.route("/:id").delete(AdminVerifyToken, Remove);

export default router;
