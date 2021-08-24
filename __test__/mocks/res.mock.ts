import type {CookieOptions} from "express";

export class ResMock {
    private _key: string;
    private _value: string;
    private _options: CookieOptions;
    private _code: number;
    private _body: any;

    constructor() {
        this.body = this.body.bind(this);
    }

    cookie(key: string, value: string, options: CookieOptions): this {
        this._key = key;
        this._value = value;
        this._options = options;
        return this;
    }

    status(code: number) {
        this._code = code;
        return this;
    }

    json(body) {
        this._body = body;
        return body;
    }

    send(body) {
        this._body = body;
    }

   body() {
       return this._body;
   }
}