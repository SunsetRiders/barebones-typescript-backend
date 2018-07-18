import * as Express from "express";
import ExampleControllerValidator from "./validator";

const router = Express.Router();

router.get("/", ExampleControllerValidator.getHealth, async (req, res, next) => {
    res.locals.status = 200;
    return next();
});

export default router;
