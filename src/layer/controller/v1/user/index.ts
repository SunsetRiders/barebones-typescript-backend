import * as Express from "express";
import UserMiddlewareValidator from "../user/user-middleware-validator";

const router = Express.Router();

router.get("/", UserMiddlewareValidator.validateRequest, async (req, res, next) => {
    res.locals.status = 201;
    return next();
});

export default router;
