import User from "../../services/user";
import Jwt from "../../services/jwt";

interface ILogin {
    email: string,
    password: string,
    token: string
}

export default async ({email, password}): Promise<ILogin> => {
    await User.login({
        email,
        password
    });

    const token = Jwt.create({email, password});

    return {
        email,
        password,
        token
    }
}