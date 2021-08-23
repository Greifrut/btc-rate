import { StatusCodes } from "http-status-codes";
import { Response } from "express";
import { IController } from "../types/interfaces/IController";

export default class Controller<T = any> implements IController<T> {
  protected request: T;

  protected response: Response;

  setRequest(request: T) {
    this.request = request;
  }

  setResponse(response: Response) {
    this.response = response;
  }

  setCookie(key: string, value: string) {
    this.response.cookie(key, value, { httpOnly: true });
  }

  successResponse(data: any) {
    this.response.json(data);
  }

  failedResponse(error: string) {
    this.response.status(StatusCodes.BAD_REQUEST).send(error);
  }
}
