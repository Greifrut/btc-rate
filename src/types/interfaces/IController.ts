import { Response } from "express";

export interface IController<T> {
  setRequest(request: T): void;
  setResponse(response: Response): void;
  setCookie(key: string, value: string): void;
  successResponse(data: any): void;
  failedResponse(error: string): void;
}
