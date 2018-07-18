import * as Express from "express";
import RouterMiddleware from "../../../lib/core/router-middleware";
import HealthCTR from "../v1/health";

const router = Express.Router();

router.use("/health", HealthCTR);
/*
    The code below is an example of how execute
    the api key header validation as a middleware

    router.use("/users", RouterMiddleware.validateApiKey, UsersCTR);
*/

export default router;
