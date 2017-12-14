import * as Express from "express";
import UserBUS from "../../../business/user-bus";
import GetUserCRT from "./contract/get-user-crt";

const router = Express.Router();

router.get("/", GetUserCRT.validateRequest, async (req, res, next) => {
    const userBUS = new UserBUS();
    res.locals.status = 200;
    res.locals.payload.user = await userBUS.getUser();
    return next();
}, GetUserCRT.validateResponse);

export default router;
