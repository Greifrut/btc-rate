import { User } from '../types/User';

export interface IUserService {
  login({ email, password }: User): Promise<User>;

  register(userCredentials: User): Promise<User>;
}
