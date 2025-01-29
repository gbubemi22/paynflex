import express from "express";
import { changePassword, Create, EditRole, forgetPassword, GetAdminByID, GetAllAdminService, GetTransactionTotals, Login, resetPassword, Trx, User, } from "./controller.js";
import { verifyToken } from "../../middleware/auth.js";
import { AdminVerifyToken } from "../../middleware/admin.auth.js";
import { authorizePermissions } from "../../middleware/checkRoles.js";
const router = express.Router();
router.route("/user-stat").get(User);
router.route("/trx-stat").get(Trx);
router.route("/trx").get(GetTransactionTotals);
router
    .route("/create")
    .post(AdminVerifyToken, authorizePermissions("Super-Admin"), Create);
router.route("/login").post(Login);
router.route("/forget-password").post(forgetPassword);
router.route("/rest-password").post(resetPassword);
router.route("/change-password").patch(verifyToken, changePassword);
router
    .route("/list")
    .get(AdminVerifyToken, authorizePermissions("Super-Admin"), GetAllAdminService);
router
    .route("/:id")
    .get(AdminVerifyToken, authorizePermissions("Super-Admin"), GetAdminByID);
router
    .route("/update-role/:adminId")
    .patch(AdminVerifyToken, authorizePermissions("Super-Admin"), EditRole);
export default router;
