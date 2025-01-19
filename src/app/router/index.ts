import { Router } from "express";
import userRoute from "../modules/user/index.js";
import walletRoute from "../modules/wallet/index.js";
import vtuRoute from "../modules/vtu/index.js";
import pinRoute from "../modules/pin/index.js";
import trxRoute from "../modules/transaction/index.js";
import kycRoute from "../modules/kyc/index.js";

const USER = `/v1/auth`;
const WALLET = `/v1/wallets`;
const VTU = `/v1/vtu`;
const PIN = `/v1/pin`;
const TRX = `/v1/transactions`;
const KYC = `/v1/kyc`;

const route = Router();

route.use(USER, userRoute);
route.use(WALLET, walletRoute);
route.use(VTU, vtuRoute);
route.use(PIN, pinRoute);
route.use(TRX, trxRoute);
route.use(KYC, kycRoute);

export default route;
