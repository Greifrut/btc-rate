import { ValidatedRequest } from "express-joi-validation";
import { Response } from "express";
import IUserRequestSchema from "./IUserSchema";
import { UserControllerHandler } from "../types/UserControllerHandler";

export interface IUserController {
  process(
    request: ValidatedRequest<IUserRequestSchema>,
    response: Response,
    handler: UserControllerHandler
  );
  login(
    request: ValidatedRequest<IUserRequestSchema>,
    response: Response
  ): void;
  register(
    request: ValidatedRequest<IUserRequestSchema>,
    response: Response
  ): void;
}
