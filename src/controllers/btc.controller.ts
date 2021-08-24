import { Response } from "express";
import { ValidatedRequest } from "express-joi-validation";

import IUserRequestSchema from "../types/interfaces/IUserSchema";
import { IBTCController } from "../types/interfaces/IBTCController";
import { IBtcService } from "../types/interfaces/IBtcService";
import Controller from "./controller";

export class BtcController extends Controller implements IBTCController {
  constructor(readonly btcService: IBtcService) {
    super();
  }

  async process(
    request: ValidatedRequest<IUserRequestSchema>,
    response: Response
  ) {
    try {
      this.setRequest(request);
      this.setResponse(response);

      this.successResponse(await this.getData());
    } catch (e) {
      this.failedResponse(e.message);
    }
  }

  getData() {
    const { coins = 1 } = this.request.query;
    return this.btcService.getPrice({ coins });
  }
}
