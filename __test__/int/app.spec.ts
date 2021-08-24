import type {Request, Response} from "express";
import * as spies from "chai-spies";
import * as chai from "chai";

import {userController, protectedMiddleware, btcController} from "../../src/routes/setup";
import {ReqMock} from "../mocks/req.mock";
import {ResMock} from "../mocks/res.mock";
import Db from "../../src/db";
import {FileDB} from "../../src/db/fileDB";
import {Middleware} from "../../src/middlewares/middleware";
import {Protected} from "../../src/middlewares/protected";

chai.use(spies);

const { expect } = chai;

describe("App", () => {
    before(async () => {
        await Db.use(new FileDB(`${__dirname}/../../src/db/fileDB/tables/`)).createTable(
            "test.users"
        );
    })

    after( async () => {
        await Db.removeTable("test.users");
    })

    it ("When new user try to register, with valid email and password, expect return user email and password", async () => {
        const request = new ReqMock( {
            email: "test",
            password: "test"
        }, {}) as Partial<Request>;
        const response = new ResMock();

        await userController.register(request as Request, response as unknown as Response);

        expect(response.body()).is.deep.contains(request.body);
    })
    it("When exist user try to login, with valid email and password, expect return user email and password", async () => {
        const request = new ReqMock( {
            email: "test",
            password: "test"
        }, {}) as Partial<Request>;
        const response = new ResMock();

        await userController.login(request as Request, response as unknown as Response);

        expect(response.body()).is.deep.contains(request.body);
    })
    it("When logged in user, try to get btc rate, expect return count of coins", async () => {
        const request = new ReqMock( {}, {authorization: "Basic test:test"}) as Partial<Request>;
        const response = new ResMock();
        const middleware = new Middleware(protectedMiddleware);

        await middleware.use(request as Request, response as unknown as Response, () => undefined);

        await btcController.process(request as Request, response as unknown as Response);

        expect(response.body()).is.deep.contains({
            btcValue: 1
        });
    })
})