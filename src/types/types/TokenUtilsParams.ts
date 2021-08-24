import { Secret, SignOptions, VerifyOptions } from "jsonwebtoken";

export type SignParams = {
  payload: Record<string, any>;
  secret: Secret;
  options?: SignOptions;
};

export type VerifyParams = {
  token: string;
  secret: Secret;
  options?: VerifyOptions;
};
