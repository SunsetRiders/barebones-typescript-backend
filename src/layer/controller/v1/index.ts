import * as Express from "express";
import UserSRV from "../v1/user";

const router = new Express.Router();

router.use("/user", UserSRV);

export default router;
