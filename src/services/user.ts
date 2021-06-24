import Db from "../db/db";

interface IUser {
    email: string,
    password: string
}

class User {
    dbName: string = "users";

    constructor() {}

    async login({email, password}: IUser) {
        const userDb = await Db.read(this.dbName);
        const user = userDb.where("email", email).where("password", password).query();

        if (!user) return false;

        return true;
    }

    async register(userCredentials: IUser) {
        const user = await Db.write<IUser>(this.dbName, userCredentials);

        if (!user) {
            return false;
        }
        return true;
    }
}

export default new User();