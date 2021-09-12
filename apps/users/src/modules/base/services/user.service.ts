import { IUserService } from '../../../typings/interfaces/IUserService';
import { IDb } from '../../../typings/interfaces/IDB';
import { User } from '../../../typings/types/User';
import { ClientProxy } from '@nestjs/microservices';

export class UserService implements IUserService {
  constructor(
    private readonly database: IDb,
    private readonly dbName: string,
    private readonly loggerClient: ClientProxy,
  ) {
    this.database.createTable('users');
  }

  async login({ email, password }: User): Promise<User> {
    this.logDebug(
      `User Microservice. User login: \n email: ${email} \n password: ${password}`,
    );

    const userDb = await this.database.read(this.dbName);
    const user = userDb
      .where((user: User) => user.email == email)
      .query<User>()[0];

    if (!user) {
      this.logError(
        `User Microservice. User doesn't exist. \n email: ${email} \n password: ${password}`,
      );
      throw new Error("User doesn't exist");
    }

    if (user.password !== password) {
      this.logError(
        `Wrong password. \n email: ${email} \n password: ${password}`,
      );
      throw new Error('Wrong password');
    }

    return user;
  }

  async register(userCredentials: User): Promise<User> {
    this.logInfo(
      `User Microservice. Register new user: \n email: ${userCredentials.email}`,
    );

    const userDb = await this.database.read(this.dbName);
    const existingUser = userDb
      .where((user: User) => user.email == userCredentials.email)
      .query<User>();

    if (existingUser.length > 0) {
      this.logError(
        `User Microservice. User is exist. \n email: ${userCredentials.email}`,
      );
      throw new Error('User is exist');
    }

    const user = await this.database.write<User>(this.dbName, userCredentials);

    if (!user) {
      this.logError(
        `User Microservice. Can't create a new user. \n email: ${userCredentials.email}`,
      );
      throw new Error("Can't create a new user");
    }

    return user;
  }

  private logInfo(message) {
    this.loggerClient.emit('info', { message });
  }

  private logDebug(message) {
    this.loggerClient.emit('debug', { message });
  }

  private logError(message) {
    this.loggerClient.emit('error', { message });
  }
}
