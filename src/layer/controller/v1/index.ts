import * as Express from "express";
import HealthCTR from "../v1/health";

const router = new Express.Router();

router.use("/health", HealthCTR);

export default router;
