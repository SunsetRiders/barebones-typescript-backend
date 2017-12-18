import UserModel from "../../../model/user/index";
import * as Joi from "joi";

class UserMiddlewareValidator {

    public static validateRequest(req, res, next) {
        const userModel = new UserModel();

        const result = userModel.validateRequest({
            id: req.query.id
        });

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

export default UserMiddlewareValidator;
