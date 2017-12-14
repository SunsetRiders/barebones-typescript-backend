import * as Joi from "joi";
import { IUser } from "../../../../interface/i-user";

class GetUserCRT {

    public static validateRequest(req, res, next) {
        const schema = Joi.object().keys({
            limit: Joi.number().integer().required()
        });

        const result = Joi.validate({
            limit: req.query.limit
        }, schema);

        if (result.error) {
            return res.status(400).json({
                metadata: res.locals.metadata,
                errors: result.error.details
            });
        } else {
            return next();            
        }
    }

    public static validateResponse(req, res, next) {
        
        const schema = Joi.object().keys({
            payload: Joi.object().keys({
                user: Joi.object().keys({
                    id: Joi.number().integer().required(),
                    name: Joi.string()
                })
            }),
            metadata: Joi.object().keys({})
        });

        const result = Joi.validate({
            payload: res.locals.payload,
            metadata: res.locals.metadata
        }, schema);

        if (result.error) {
            res.locals.status = 500;
            res.locals.errors = result.error.details;
        } 

        return next();            
    }

}

export default GetUserCRT;
