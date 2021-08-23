import * as Joi from "@hapi/joi";

export default Joi.object({
  coins: Joi.number(),
});
