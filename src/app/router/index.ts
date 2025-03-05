import { Router } from "express";

import walletRoute from "../modules/wallet/index.js";
import vtuRoute from "../modules/vtu/index.js";
import pinRoute from "../modules/pin/index.js";
import trxRoute from "../modules/transaction/index.js";
import kycRoute from "../modules/kyc/index.js";
import adminRoute from "../modules/admin/index.js";
import RoleRouter from "../modules/role/index.js";
import bizRouter from "../modules/business/index.js";
import productRouter from "../modules/product/index.js";
import categoryRouter from "../modules/category/index.js";
import userRoute from "../modules/user/index.js";
import adminSettings from "../modules/adminSetting/index.js";
import adminPointSettings from "../modules/pointSettings/index.js";
import notification from "../modules/notification/index.js";

const WALLET = `/v1/wallets`;
const VTU = `/v1/vtu`;
const PIN = `/v1/pin`;
const TRX = `/v1/transactions`;
const KYC = `/v1/kyc`;
const Admin = `/v1/auth/admin`;
const ROLE = `/v1/roles`;
const BUSINESS = `/v1/business`;
const PRODUCT = `/v1/products`;
const CATEGORY = `/v1/category`;
const USER = `/v1/auth`;
const ADMIN_SETTINGS = `/v1/admin-settings`;
const ADMIN_POINT_SETTINGS = `/v1/point-settings`;
const NOTIFICATION = `/v1/notifications`;

const route = Router();

route.use(USER, userRoute);
route.use(WALLET, walletRoute);
route.use(VTU, vtuRoute);
route.use(PIN, pinRoute);
route.use(TRX, trxRoute);
route.use(KYC, kycRoute);
route.use(Admin, adminRoute);
route.use(ROLE, RoleRouter);
route.use(BUSINESS, bizRouter);
route.use(PRODUCT, productRouter);
route.use(CATEGORY, categoryRouter);
route.use(ADMIN_SETTINGS, adminSettings);
route.use(ADMIN_POINT_SETTINGS, adminPointSettings);
route.use(NOTIFICATION, notification);

export default route;
