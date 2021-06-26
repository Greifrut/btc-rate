import {Router} from "express";
import * as Joi from "@hapi/joi";
import "joi-extract-type";
import {createValidator, ContainerTypes, ValidatedRequestSchema, ValidatedRequest} from "express-joi-validation";

import btcSchema from "../schemas/btc";
import userSchema from "../schemas/user";
import btcController from "../controllers/bts";
import Protected from "../middlewares/protected";
import {create as createController, login as loginController} from "../controllers/user";

interface IUserRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: Joi.extractType<typeof userSchema>
}

interface IBTCRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Query]: Joi.extractType<typeof btcSchema>
}

const router = Router();
const validator = createValidator();

router.get("/btcRate", Protected.check.bind(Protected), async (req: ValidatedRequest<IBTCRequestSchema>, res) => {
    try {
        const {coins = 1} = req.query;
        const rate = await btcController({coins});
        res.json(rate);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

router.post("/user/login", validator.body(userSchema), async (req: ValidatedRequest<IUserRequestSchema>, res) => {
   try {
       const response = await loginController(req.body);
       res.json(response)
   } catch (e) {
       res.status(404).send(e.message);
   }
});

router.post("/user/create", validator.body(userSchema), async (req: ValidatedRequest<IUserRequestSchema>, res) => {
    try {
        const response = await createController(req.body);
        res.json(response)
    } catch (e) {
        res.status(500).send(e.message);
    }
});

export default router;