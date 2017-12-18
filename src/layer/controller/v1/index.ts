import * as Express from "express";
import HealthCTR from "../v1/health";
import UserCTR from "../v1/user";

const router = new Express.Router();

router.use("/health", HealthCTR);
router.use("/user", UserCTR);

export default router;
