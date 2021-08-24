import {IJwtService} from "../../src/types/interfaces/IJwtService";

export class JwtServiceMock implements IJwtService {
    create({email, password}: { email: any; password: any }): string {
        return "";
    }

    verify(pubToken: string): Promise<boolean> {
        return Promise.resolve(true);
    }
}