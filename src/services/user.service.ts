import { IUserService } from "../types/interfaces/IUserService";
import { IDb } from "../types/interfaces/IDB";
import { User } from "../types/types/User";

export class UserService implements IUserService {
  constructor(
    private readonly database: IDb,
    private readonly dbName: string
  ) {
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }

  async login({ email, password }: User): Promise<User> {
    const userDb = await this.database.read(this.dbName);
    const user = userDb
      .where((user: User) => user.email == email)
      .query<User>()[0];

    if (!user) {
      throw new Error("User doesn't exist");
    }

    if (user.password !== password) {
      throw new Error("Wrong password");
    }

    return user;
  }

  async register(userCredentials: User): Promise<User> {
    const userDb = await this.database.read(this.dbName);
    const existingUser = userDb
      .where((user: User) => user.email == userCredentials.email)
      .query<User>();

    if (existingUser.length > 0) {
      throw new Error("User is exist");
    }

    const user = await this.database.write<User>(this.dbName, userCredentials);

    if (!user) {
      throw new Error("Can't create a new user");
    }

    return user;
  }
}
