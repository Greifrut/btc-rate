import type { JwtPayload } from "jsonwebtoken";
import { SignParams, VerifyParams } from "../types/TokenUtilsParams";

export interface ITokenUtils {
  sign({ payload, secret, options }: SignParams): string;

  verify({ token, secret }: VerifyParams): JwtPayload | string;
}
