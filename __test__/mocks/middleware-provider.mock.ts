import {
  IMiddlewareProvider,
  MiddlewareResponse,
} from "../../src/types/interfaces/IMiddlewareProvider";
import { Request } from "express";

export class MiddlewareProviderMock implements IMiddlewareProvider {
  private _req: Request;

  constructor(private readonly answer: MiddlewareResponse) {}

  async check(req: Request): Promise<MiddlewareResponse> {
    this._req = req;
    return Promise.resolve(this.answer);
  }
}
