import * as Joi from "@hapi/joi";

export default Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
})