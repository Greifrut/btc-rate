import {Request, Response} from "express";
import {get} from "config";
import Jwt from "../services/jwt";
import User from "../services/user";

enum AuthTypes {
    Bearer = "Bearer",
    Basic = "Basic"
}

class Protected {
    private _req: Request;
    private _res: Response;
    private readonly tokenKey: string = get("cookieName");

    constructor() {}

    async check(req: Request, res: Response, next) {
        try {
            this._req = req;
            this._res = res;

            if (this._hasTokenInCookies()) {
               await this._checkCookies();
            } else {
              await this._checkAuthHeader();
            }

            next();
        } catch (e) {
            res.status(404).send(e.message);
        }
    }

    private _hasTokenInCookies() {
        return this.tokenKey in this._req.cookies;
    }

    private async _checkCookies() {
       const token = this._req.cookies[this.tokenKey];
       await this._bearer({token});
    }

    private async _checkAuthHeader() {
        const authType: AuthTypes | null = this._getAuthorizationType();

        if (!authType) this._res.status(404).send("Provide valid authorization");

        const verifier = this._getVerifier(authType);

        await verifier();
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

    private async _bearer({token = this._getAuthorizationValue()}) {
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