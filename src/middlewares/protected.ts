import {Request, Response} from "express";
import Jwt from "../services/jwt";
import User from "../services/user";

enum AuthTypes {
    Bearer = "Bearer",
    Basic = "Basic"
}

class Protected {
    private _req: Request;
    private _res: Response;

    constructor() {}

    async check(req: Request, res: Response, next) {
        try {
            this._req = req;
            this._res = res;

            const authType: AuthTypes | null = this._getAuthorizationType();

            if (!authType) res.status(404).send("Provide valid authorization");

            const verifier = this._getVerifier(authType);

            await verifier();

            next();
        } catch (e) {
            res.status(404).send(e.message);
        }
    }

    private _getAuthorizationType(): AuthTypes {
        const {headers: {authorization}} = this._req;
        if (!authorization) return null;

        const reqAuthType: any = authorization.split(" ")[0];

        if (!Object.values(AuthTypes).includes(reqAuthType)) return null;

        return AuthTypes[authorization.split(" ")[0]];
    }

    private _getAuthorizationValue(): string {
        const {headers: {authorization}} = this._req;
        if (!authorization) return null;

        return authorization.split(" ")[1];
    }

    private async _bearer() {
        const token = this._getAuthorizationValue();
        await Jwt.verify(token)
    }

    private async _basic() {
        const basicAuth = Buffer.from(this._getAuthorizationValue(), "base64").toString();
        const [email, password] = basicAuth.split(":");

        await User.login({email, password});
        return true;
    }

    private _getVerifier(authType: AuthTypes) {
        return this[`_${authType.toLowerCase()}`].bind(this);
    }
}

export default new Protected();