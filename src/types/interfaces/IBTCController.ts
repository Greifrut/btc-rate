import { ValidatedRequest } from "express-joi-validation";
import { Response } from "express";
import { IController } from "./IController";
import { IBtcService } from "./IBtcService";
import IUserRequestSchema from "./IUserSchema";

export interface IBTCController extends IController<any> {
  readonly btcService: IBtcService;

  process(
    request: ValidatedRequest<IUserRequestSchema>,
    response: Response
  ): Promise<void>;

  getData(): any;
}
