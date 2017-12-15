import * as Joi from "joi";

class UserVal {

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

}

export default UserVal;
