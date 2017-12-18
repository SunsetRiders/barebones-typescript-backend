import * as Express from "express";
import PostgresClientV2 from "../../../microservice/postgres-client-v2";
import RouterMiddleware from "../../../../lib/core/router-middleware";

const router = Express.Router();

router.get("/", async (req, res, next) => {
    res.locals.status = 204;
    return next();
});

router.get("/postgres", async (req, res, next) => {
    const postgresClientV2 = new PostgresClientV2(req, res);
    const msResponse = await postgresClientV2.health();
    RouterMiddleware.setDefaultLocals(req, res, msResponse);
    return next();
});

export default router;
