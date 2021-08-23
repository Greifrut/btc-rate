import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import {JwtService} from "../../../src/services/jwt.service";
import {MockDatabase} from "../../mocks/database.mock";
import {TokenUtilsMock} from "../../mocks/token-utils.mock";
chai.use(chaiAsPromised);

const {expect} = chai;

describe("JWT service", () => {
    describe("#create", () => {
        it("When email and password provided, expect jwt token to be created", () => {
            const jwtService = new JwtService(new MockDatabase(), new TokenUtilsMock(), "public", "secret");
            const emailAndPassword = {email: "email_test", password: "password_test"};

           expect(jwtService.create(emailAndPassword)).is.equal("public");
        })
        it ("When email didn't provided, expect error 'Email is empty'", () => {
            const jwtService = new JwtService(new MockDatabase(), new TokenUtilsMock(), "public", "secret");
            const emailAndPassword = {email: "", password: "password_test"};

            expect(jwtService.create.bind(jwtService, emailAndPassword)).is.throw("Email is empty");
        })
        it("When password didn't provided, expect error 'Password is empty'", () => {
            const jwtService = new JwtService(new MockDatabase(), new TokenUtilsMock(), "public", "secret");
            const emailAndPassword = {email: "email_test", password: ""};

            expect(jwtService.create.bind(jwtService, emailAndPassword)).is.throw("Password is empty");
        })
    })
    describe("#verify", () => {
        it("When valid token provided, expect validation will success", async () => {
            const token = {email: "email_test", privateToken: JSON.stringify({ password: "password_test", exp: Date.now() + 1000 })};
            const mockDB = new MockDatabase();
            mockDB.createTable("users");
            await mockDB.write("users", {email: "email_test", password: "password_test"});
            const jwtService = new JwtService(mockDB, new TokenUtilsMock(), "public", "secret");

            const isValidUser = await jwtService.verify(JSON.stringify(token));

            expect(isValidUser).is.true;
        })
        it("When not valid token provided, expect error 'Authorization failed. Please provide valid token'", async () => {
            const jwtService = new JwtService(new MockDatabase(), new TokenUtilsMock(), "public", "secret");

            // @ts-ignore
            await expect(jwtService.verify(JSON.stringify("{}"))).to.be.rejectedWith("Authorization failed. Please provide valid token");
        })
        it("When token is valid, but token is expired, expect error 'Authorization failed. Please re-login'", async () => {
            const token = {email: "email_test", privateToken: JSON.stringify({ password: "password_test", exp: (Date.now() - 10) / 1000 })};
            const mockDB = new MockDatabase();
            mockDB.createTable("users");
            await mockDB.write("users", {email: "email_test", password: "password_test"});
            const jwtService = new JwtService(mockDB, new TokenUtilsMock(), "public", "secret");

            // @ts-ignore
            await expect(jwtService.verify(JSON.stringify(token))).to.be.rejectedWith("Authorization failed. Please re-login");
        })
    })
})