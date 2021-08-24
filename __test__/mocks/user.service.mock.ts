import {IUserService} from "../../src/types/interfaces/IUserService";
import {User} from "../../src/types/types/User";

export class UserServiceMock implements IUserService {
    constructor(private readonly data: any) {
    }

    login({email, password}: User): Promise<User> {
        return Promise.resolve(this.data);
    }

    register(userCredentials: User): Promise<User> {
        return Promise.resolve(this.data);
    }
}