import * as Joi from "@hapi/joi";

export default Joi.object({
    email: Joi.string().email({tlds: {allow: true}}).required(),
    password: Joi.string().required()
})