import { IJwtService } from '../../../typings/interfaces/IJwtService';
import { ITokenUtils } from '../../../typings/interfaces/ITokenUtils';
import { PublicToken } from '../../../typings/types/PublicToken';
import { PrivateToken } from '../../../typings/types/PrivateToken';
import { IDb } from '../../../typings/interfaces/IDB';
import { User } from '../../../typings/types/User';

export class JwtService implements IJwtService {
  static isAuthValid(
    paramsIsNotNull,
    error = 'Authorization failed. Please provide valid token',
  ): boolean {
    if (paramsIsNotNull()) {
      return true;
    }

    throw new Error(error);
  }

  static async getUser(db: IDb, email): Promise<User> {
    const userDB = await db.read('users');

    const userHandler = (user: User) => user.email === email;

    return userDB.where(userHandler).query<User>()[0];
  }

  constructor(
    private readonly database: IDb,
    private readonly tokenUtils: ITokenUtils,
    private readonly publicSecret: string,
    private readonly privateSecret: string,
  ) {}

  create({ email, password }) {
    if (!email) {
      throw new Error('Email is empty');
    }

    if (!password) {
      throw new Error('Password is empty');
    }

    const privateToken = this.tokenUtils.sign({
      payload: {
        password,
      },
      secret: this.privateSecret,
      options: { expiresIn: '168h' },
    });

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
      const { email, privateToken } = this.decodeToken<PublicToken>(pubToken);

      JwtService.isAuthValid(() => email && privateToken);

      const user = await JwtService.getUser(this.database, email);

      JwtService.isAuthValid(() => user);

      const { password, exp } = this.decodeToken<PrivateToken>(privateToken);

      JwtService.isAuthValid(() => password === user.password);
      JwtService.isAuthValid(
        () => Date.now() < this.tokenExpireDate(exp),
        'Authorization failed. Please re-login',
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
