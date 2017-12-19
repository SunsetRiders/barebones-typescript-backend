import * as Express from "express";
import HealthCTR from "../v1/health";
import ProductCTR from "../v1/products";

const router = new Express.Router();

router.use("/health", HealthCTR);
router.use("/products", ProductCTR);

export default router;
