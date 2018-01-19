import * as Express from "express";

const router = Express.Router();

router.get("/", async (req, res, next) => {
    res.locals.status = 200;
    return next();
});

export default router;
