import { ValidatedRequest } from "express-joi-validation";
import { Response } from "express";
import { get } from "config";

import Controller from "./controller";

import {
  UserControllerHandler,
  UserCredential,
} from "../types/types/UserControllerHandler";
import { IUserController } from "../types/interfaces/IUserController";
import IUserRequestSchema from "../types/interfaces/IUserSchema";
import { IUserService } from "../types/interfaces/IUserService";
import { IJwtService } from "../types/interfaces/IJwtService";

export class UserController
  extends Controller<ValidatedRequest<IUserRequestSchema>>
  implements IUserController
{
  private userCredential: UserCredential = {
    email: "",
    password: "",
  };

  constructor(
    private readonly userService: IUserService,
    private readonly jwtService: IJwtService
  ) {
    super();
    this.process = this.process.bind(this);
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  async process(
    request: ValidatedRequest<IUserRequestSchema>,
    response: Response,
    handler: UserControllerHandler
  ) {
    try {
      this.setRequest(request);
      this.setResponse(response);

      this.userCredential = {
        email: this.request.body.email,
        password: this.request.body.password,
      };

      const token = this.jwtService.create(this.userCredential);

      await handler(this.userCredential);

      this.setCookie(get("cookieName"), token);

      this.successResponse({ ...this.userCredential, token });
    } catch (e) {
      this.failedResponse(e.message);
    }
  }

  async login(
    request: ValidatedRequest<IUserRequestSchema>,
    response: Response
  ) {
    await this.process(request, response, this.userService.login);
  }

  async register(
    request: ValidatedRequest<IUserRequestSchema>,
    response: Response
  ) {
    await this.process(request, response, this.userService.register);
  }
}
