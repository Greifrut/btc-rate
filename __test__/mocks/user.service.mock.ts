import { IUserService } from "../../src/types/interfaces/IUserService";
import { User } from "../../src/types/types/User";

export class UserServiceMock implements IUserService {
  constructor(private readonly data: any) {}

  login({}: User): Promise<User> {
    return Promise.resolve(this.data);
  }

  register({}: User): Promise<User> {
    return Promise.resolve(this.data);
  }
}
