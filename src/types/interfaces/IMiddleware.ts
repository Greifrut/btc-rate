import {IMiddlewareProvider} from "./IMiddlewareProvider";
import {NextFunction, Request, Response} from "express";

export interface IMiddleware {
    readonly checker: IMiddlewareProvider;

    use(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
}