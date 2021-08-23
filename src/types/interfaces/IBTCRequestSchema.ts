import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import * as Joi from "@hapi/joi";
import btcSchema from "../../schemas/btc";

export default interface IBTCRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: Joi.extractType<typeof btcSchema>;
}
