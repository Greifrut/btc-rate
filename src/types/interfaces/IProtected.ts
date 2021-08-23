import { Request, Response, NextFunction } from "express";

interface IProtected {
  isValidAuth(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export default IProtected;
