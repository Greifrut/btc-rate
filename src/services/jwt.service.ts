import { sign } from "jsonwebtoken";

import { IJwtService } from "../types/interfaces/IJwtService";
import { PrivateToken } from "../types/types/PrivateToken";
import { IPubToken } from "../types/interfaces/IPubToken";
import { IDb } from "../types/interfaces/IDB";
import { User } from "../types/types/User";
import { ITokenUtils } from "../types/interfaces/ITokenUtils";

export class JwtService implements IJwtService {
  static isAuthValid(
    paramsIsNotNull,
    error = "Authorization failed. Please provide valid token"
  ): boolean {
    if (paramsIsNotNull()) {
      return true;
    }

    throw new Error(error);
  }

  static async getUser(db: IDb, email): Promise<User> {
    const userDB = await db.read("users");

    const userHandler = (user: User) => user.email === email;

    return userDB.where(userHandler).query<User>()[0];
  }

  constructor(
    private readonly database: IDb,
    private readonly tokenUtils: ITokenUtils,
    private readonly publicSecret: string,
    private readonly privateSecret: string
  ) {}

  create({ email, password }) {
    if (!email) {
      throw new Error("Email is empty");
    }

    if (!password) {
      throw new Error("Password is empty");
    }

    const privateToken = sign(
      {
        password,
      },
      this.privateSecret,
      { expiresIn: "168h" }
    );

    return this.tokenUtils.sign({
      payload: {
        email,
        privateToken,
      },
      secret: this.publicSecret,
    });
  }

  async verify(pubToken: string): Promise<boolean> {
    try {
      const { email, privateToken } = this.decodeToken<IPubToken>(pubToken);

      JwtService.isAuthValid(() => email && privateToken);

      const user = await JwtService.getUser(this.database, email);

      JwtService.isAuthValid(() => user);

      const { password, exp } = this.decodeToken<PrivateToken>(privateToken);

      JwtService.isAuthValid(() => password === user.password);
      JwtService.isAuthValid(
        () => Date.now() < this.tokenExpireDate(exp),
        "Authorization failed. Please re-login"
      );

      return true;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  private tokenExpireDate = (exp) => exp * 1000;

  private decodeToken<T>(token: string): T {
    return this.tokenUtils.verify({
      token,
      secret: this.publicSecret,
    }) as T;
  }
}
