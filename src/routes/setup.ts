import { createValidator } from "express-joi-validation";
import { Router } from "express";
import { get } from "config";
import axios from "axios";

import { IUserController } from "../types/interfaces/IUserController";
import { IBTCController } from "../types/interfaces/IBTCController";
import { IUserService } from "../types/interfaces/IUserService";
import { UserController } from "../controllers/userController";
import { IJwtService } from "../types/interfaces/IJwtService";
import { IBtcService } from "../types/interfaces/IBtcService";
import { BTCController } from "../controllers/btcController";
import { UserService } from "../services/user.service";
import { JwtService } from "../services/jwt.service";
import { Protected } from "../middlewares/protected";
import { BtcService } from "../services/btc.service";
import database from "../db";
import {TokenUtils} from "../utils/token-utils";
import {ITokenUtils} from "../types/interfaces/ITokenUtils";

const router = Router();
const validator = createValidator();

const tokenKey: string = get("cookieName");
const btcApiUrl: string = get("btcApi");
const publicSecretPhrase: string = get("jwt.publicTokenSecret");
const privateSecretPhrase: string = get("jwt.privateTokenSecret");
const usersDatabaseName: string = get("db.users");

const tokenUtil: ITokenUtils = new TokenUtils();
const jwtService: IJwtService = new JwtService(
  database,
  tokenUtil,
  publicSecretPhrase,
  privateSecretPhrase
);
const userService: IUserService = new UserService(database, usersDatabaseName);

const protectedMiddleware = new Protected(jwtService, userService, tokenKey);

const btcService: IBtcService = new BtcService(axios, btcApiUrl);
const btcController: IBTCController = new BTCController(btcService);

const userController: IUserController = new UserController(
  userService,
  jwtService
);

export {
  router,
  validator,
  protectedMiddleware,
  btcController,
  userController,
};
