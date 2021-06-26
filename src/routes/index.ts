import {Router} from "express";
import * as Joi from "@hapi/joi";
import "joi-extract-type";
import {createValidator, ContainerTypes, ValidatedRequestSchema} from "express-joi-validation";

import userSchema from "../schemas/user";
import {create as createController, login as loginController} from "../controllers/user";
import btcController from "../controllers/bts";

interface IUserSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: Joi.extractType<typeof userSchema>
}

const router = Router();
const validator = createValidator();

router.get("/btcRate", btcController);
router.post("/user/login", validator.body(userSchema), loginController);
router.post("/user/create", validator.body(userSchema), createController);

export default router;