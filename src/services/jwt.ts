import {JwtPayload, sign, verify} from "jsonwebtoken";
import Db from "../db/db";
import * as config from "config";

interface IPubToken {
    email: string,
    privateToken: string
}

class Jwt {
    private readonly publicSecret: string = config.get("jwt.publicTokenSecret");
    private readonly privateSecret: string = config.get("jwt.privateTokenSecret");
    constructor() {}

    create({email, password}) {
        const privateToken = sign({
            password
        }, this.privateSecret, {expiresIn: "168h"});

        return sign({
            email,
            privateToken
        }, this.publicSecret);
    }

    async verify(pubToken: string) {
        try {
            const pubPayload = verify(pubToken, this.publicSecret) as Partial<JwtPayload>;
            const {email, privateToken} = pubPayload as Partial<JwtPayload> & IPubToken;

            if (!email || !privateToken) throw new Error("Authorization failed. Please provide valid token");

            const db = await Db.read("users");
            const user = db.where("email", email).query()[0];

            if (!user) throw new Error("Authorization failed. Please provide valid token");

            const privatPayload = verify(privateToken, this.privateSecret);
            const {password, exp} = privatPayload as Partial<JwtPayload>;

            if (password !== user.password || Date.now() > exp * 1000) throw new Error("Authorization failed. Please provide valid token");
        } catch (e) {
            throw new Error(e.message);
        }
    }
}

export default new Jwt();