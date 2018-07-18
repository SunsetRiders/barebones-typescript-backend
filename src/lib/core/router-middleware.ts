import Config from "../../lib/environment/config";

const config = Config.configFactory();

class RouterMiddleware {

    public static initialMiddleware(req, res, next): any {
        res.locals.status = 404;
        res.locals.payload = {};
        res.locals.metadata = {};
        res.locals.errors = [];
        return next();
    }

    public static validateApiKey(req, res, next): any {
        if (req.get("api_key") !== config.server.apiKey) {
            return res.status(401).json({
                metadata: res.locals.metadata,
                errors: [{
                    field: "api_key header",
                    message: "Not a valid api key have been provided."
                }]
            });
        }
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
        const result = {};

        res.status(res.locals.status);
        req.logger.info(res.locals);

        if (Object.keys(res.locals.metadata).length > 0) {
            result["metadata"] = res.locals.metadata;
        }

        if (res.locals.status < 400) {
            if (Object.keys(res.locals.payload).length) {
                result["payload"] = res.locals.payload;
            }
            if (Object.keys(result).length) {
                return res.json(result);
            }
            return res.end("");
        }

        delete result["payload"];
        if (Array.isArray(res.locals.errors) && res.locals.errors.length) {
            result["errors"] = res.locals.errors;
        }
        return res.json(result);
    }

}

export default RouterMiddleware;
