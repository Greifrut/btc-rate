import { Request } from "express";

export type MiddlewareResponse = [isValid: boolean, error: string];

export interface IMiddlewareProvider {
  check(req: Request): Promise<MiddlewareResponse>;
}
