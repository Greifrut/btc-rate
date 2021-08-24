import { ITokenUtils } from "../../src/types/interfaces/ITokenUtils";
import {
  SignParams,
  VerifyParams,
} from "../../src/types/types/TokenUtilsParams";
import type { JwtPayload } from "jsonwebtoken";

export class TokenUtilsMock implements ITokenUtils {
  private static isJSON(value) {
    try {
      JSON.stringify(value);
      return true;
    } catch (e) {
      return false;
    }
  }

  sign({ secret }: SignParams): string {
    return secret.toString();
  }

  verify({ token }: VerifyParams): JwtPayload | string {
    return TokenUtilsMock.isJSON(token) ? JSON.parse(token) : token;
  }
}
