import * as Joi from "joi";

class HealthControllerValidator {

    public static async getHealth(req, res, next): Promise<Error> {
        return Joi.validate(
            // Current request
            {
              query: req.query
            },
            // Request schema
            {
              query: Joi.object().keys({
                test: Joi.string().optional()
              }).required()
            })
            .then(() => next())
            .catch(err => next(err));
    }

}

export default HealthControllerValidator;
