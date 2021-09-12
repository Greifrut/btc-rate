import { Request } from 'express';

export type VerifyResponse = boolean;

export interface IVerifyService {
  check(req: Request): Promise<VerifyResponse>;
}
