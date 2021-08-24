import { IMiddlewareProvider } from "../types/interfaces/IMiddlewareProvider";
import type { NextFunction, Request, Response } from "express";
import { IMiddleware } from "../types/interfaces/IMiddleware";

export class Middleware implements IMiddleware {
  constructor(readonly checker: IMiddlewareProvider) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const [isValid, error] = await this.checker.check(req);

      if (error) return res.status(401).send(error);

      if (!isValid) return res.status(401).send("Your token is invalid");

      next();
    } catch (e) {
      res.status(404).send(e.message);
    }
  }
}
