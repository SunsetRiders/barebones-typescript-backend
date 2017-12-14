import * as Express from "express";
import Service from "./service";
import UserBUS from "../../business/user-bus";

const router = Express.Router();

/*
1 - Add error handler
2- Add contract - server layer
*/

router.get("/", async (req, res, next) => {
    const userBUS = new UserBUS();
    res.locals.status = 200;
    res.locals.payload.user = await userBUS.getUser();
    return next();
});

export default router;
