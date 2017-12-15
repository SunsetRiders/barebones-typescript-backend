import * as Express from "express";
import UserRPT from "../../../repository/user-rpt";
import UserVal from "./validator/user-val";

const router = Express.Router();

router.get("/", UserVal.validateRequest, async (req, res, next) => {
    const userRPT = new UserRPT();
    res.locals.status = 200;
    res.locals.payload.user = await userRPT.getUser();
    return next();
});

export default router;
