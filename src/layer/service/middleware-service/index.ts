class MiddlewareService {

    public static initialMiddleware(req, res, next): any {
        res.locals.status = 404;
        res.locals.payload = {};
        res.locals.metadata = {};
        res.locals.errors = [];
        return next();
    }

    public static requestValidatorMw(req, res, next): any {
        return next();
    }

    public static responseValidatorMw(req, res, next): any {
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

    public static sendResponseMw(req, res, next): any {
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

        result.errors = res.locals.errors;
        return res.json(result);
    }

}

export default MiddlewareService;
