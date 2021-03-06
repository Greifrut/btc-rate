import { sign, verify } from "jsonwebtoken";
import { ITokenUtils } from "../types/interfaces/ITokenUtils";

export class TokenUtils implements ITokenUtils {
  sign({ payload, secret, options }) {
    return sign(payload, secret, options);
  }

  verify({ token, secret }) {
    return verify(token, secret);
  }
}
