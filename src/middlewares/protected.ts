import { Request } from "express";

import AuthTypes from "../types/enums/AuthTypes";
import { IJwtService } from "../types/interfaces/IJwtService";
import { IUserService } from "../types/interfaces/IUserService";
import {IMiddlewareProvider, MiddlewareResponse} from "../types/interfaces/IMiddlewareProvider";

export class Protected implements IMiddlewareProvider {
  private req: Request;

  constructor(
    private readonly jwtService: IJwtService,
    private readonly userService: IUserService,
    private readonly tokenKey: string
  ) {
    this.isValidAuth = this.isValidAuth.bind(this);
    this.check = this.check.bind(this);
  }

  async check(req: Request): Promise<MiddlewareResponse> {
    try {
      await this.isValidAuth(req);
      return [true, null];
    } catch (e) {
      return [false, e.message];
    }
  }

  private async isValidAuth(req: Request) {
    try {
      this.req = req;

      if (this.hasTokenInCookies()) {
        await this.checkCookies();
      } else {
        await this.isAuthTypeValid();
      }
    } catch (e) {
      throw new Error(e.message);
    }
  }

  private hasTokenInCookies(): boolean {
    return this.tokenKey in this.req.cookies;
  }

  private async checkCookies() {
    try {
      const token = this.req.cookies[this.tokenKey];
      await this.bearer({ token });
    } catch (e) {
      throw new Error("Invalid token. Please re-login")
    }
  }

  private async bearer({ token = this.getAuthorizationValue() }) {
    try {
      await this.jwtService.verify(token);
    } catch (e) {
      throw new Error("Provide valid token");
    }
  }

  private async isAuthTypeValid() {
    const authType: AuthTypes | null = this.getAuthTypeFromRequestHeader();

    if (!authType) {
      throw new Error("Provide valid authorization");
    }

    const verifier = this.getVerifier(authType);

    await verifier();
  }

  private getAuthTypeFromRequestHeader(): AuthTypes {
    const {
      headers: { authorization },
    } = this.req;

    if (!authorization) {
      return null;
    }

    const reqAuthType: any = authorization.split(" ")[0];

    if (!Object.values(AuthTypes).includes(reqAuthType)) {
      return null;
    }

    return AuthTypes[reqAuthType];
  }

  private getAuthorizationValue(): string {
    const {
      headers: { authorization },
    } = this.req;

    if (!authorization) {
      return null;
    }

    return authorization.split(" ")[1];
  }

  private async basic() {
    try {
      const basicAuth = Buffer.from(
          this.getAuthorizationValue(),
          "base64"
      ).toString();
      const [email, password] = basicAuth.split(":");

      await this.userService.login({ email, password });

    } catch (e) {
      throw new Error("Provide valid login or password");
    }
  }

  private getVerifier(authType: AuthTypes) {
    return this[`${authType.toLowerCase()}`].bind(this, {});
  }
}
