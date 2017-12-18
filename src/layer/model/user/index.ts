import { IModel } from "../../interface/i-model";
import * as Joi from "joi";

class UserMDL implements IModel {

  public id: number;
  public name: string;

  public getValidationSchema(): object {
    return Joi.object().keys({
      id: Joi.number().integer().required(),
      name: Joi.string()
    });
  }

  public validateRequest(obj): any {
    return Joi.validate(obj, this.getValidationSchema());
  }

}

export default UserMDL;
