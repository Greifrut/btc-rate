import { IJwtService } from "../../src/types/interfaces/IJwtService";

export class JwtServiceMock implements IJwtService {
  private _pubToken: string;

  create({}: { email: any; password: any }): string {
    return "";
  }

  verify(pubToken: string): Promise<boolean> {
    this._pubToken = pubToken;
    return Promise.resolve(true);
  }
}
