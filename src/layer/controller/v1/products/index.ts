import * as Express from "express";
import ProductRPT from "../../../repository/product-rpt";

const router = Express.Router();

router.get("/", async (req, res, next) => {
    const productRPT = new ProductRPT({ logger: req.logger });
    res.locals.status = 200;
    res.locals.payload.products = await productRPT.list();
    return next();
});

export default router;
