import * as Express from "express";
import PostgresClientV2 from "../../../microservice/postgres-client-v2";

const router = Express.Router();

router.get("/", async (req, res, next) => {
    res.locals.status = 200;
    return next();
});

router.get("/postgres", async (req, res, next) => {
    const postgresClientV2 = new PostgresClientV2(req, res);
    return await postgresClientV2.health().then(msResponse => {
        postgresClientV2.setDefaultLocals(req, res, msResponse);
        return next();
    });
});

export default router;
