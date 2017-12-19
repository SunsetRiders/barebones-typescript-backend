class RouterMiddleware {

    public static initialMiddleware(req, res, next): any {
        res.locals.status = 404;
        res.locals.payload = {};
        res.locals.metadata = {};
        res.locals.errors = [];
        return next();
    }

    public static responseParser(req, res, next): any {
         // Deal with errors
        if (res.locals.status === 404 && Array.isArray(res.locals.errors) && res.locals.errors.length === 0) {
            res.locals.errors.push(new Error("Not Found"));
        }
        if (Array.isArray(res.locals.errors) && res.locals.errors.length > 0) {
            res.locals.errors = res.locals.errors.map(error => {
            return ((error instanceof Error) ? {
                message: error.message,
                stack: ((process.env.NODE_ENV === "development") ? error.stack : undefined)
            } : {
                field: ((error.field) ? error.field : null),
                message: ((error.message) ? error.message : null)
            });
            });
        }
        return next();
    }

    public static sendResponse(req, res, next): any {
        const result = {
            payload: {},
            metadata: {},
            errors: undefined
        };

        res.status(res.locals.status);

        req.logger.info(res.locals);

        if (res.locals.status < 400) {
            result.payload = res.locals.payload;
            return res.json(result);
        }

        delete result.payload;
        result.errors = res.locals.errors;
        return res.json(result);
    }

  /**
   * Set default locals
   * @param {Request} cReq Current request
   * @param {Response} cRes Current response
   * @param {Response} msRes Microservice response
   */
  public static setDefaultLocals(cReq, cRes, msRes): void {
    cRes.locals.status   = ((msRes && msRes.statusCode) ? msRes.statusCode : cRes.locals.status);
    cRes.locals.payload  = ((msRes && msRes.body && msRes.body.payload) ? msRes.body.payload : cRes.locals.payload);
    cRes.locals.metadata = ((msRes && msRes.body && msRes.body.metadata) ? msRes.body.metadata : cRes.locals.metadata);
    cRes.locals.errors   = ((msRes && msRes.body && msRes.body.errors) ? msRes.body.errors : cRes.locals.errors);
    cReq.logger.info({microServiceResponse: cRes.locals });
  }

}

export default RouterMiddleware;
