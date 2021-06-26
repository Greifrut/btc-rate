import User from "../../services/user";
import Jwt from "../../services/jwt";

export default async ({email, password}) => {
    if (!email || !password) throw new Error();

    await User.register({
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