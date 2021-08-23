import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import * as Joi from "@hapi/joi";
import userSchema from "../../schemas/user";

export default interface IUserRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: Joi.extractType<typeof userSchema>;
}
