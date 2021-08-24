import { Request } from "express";
import * as chai from "chai";

import { Protected } from "../../../src/middlewares/protected";
import { UserServiceMock } from "../../mocks/user.service.mock";
import { JwtServiceMock } from "../../mocks/jwt.service.mock";

const { expect } = chai;

describe("Protected", () => {
  describe("#check", () => {
    it("When bearer token provided in request, expect request will valid", async () => {
      const request: Partial<Request> = {
        headers: {
          authorization: "Bearer dasdwqwe123213213",
        },
        cookies: {},
      };

      const userService = new UserServiceMock({
        email: "test",
        password: "test",
      });
      const jwtService = new JwtServiceMock();
      const protectedMiddleware = new Protected(
        jwtService,
        userService,
        "token"
      );

      const [isValid] = await protectedMiddleware.check(request as Request);

      expect(isValid).is.true;
    });
    it("When basic auth type provided in request, expect request will valid", async () => {
      const request: Partial<Request> = {
        headers: {
          authorization: "Basic test:test",
        },
        cookies: {},
      };

      const userService = new UserServiceMock({
        email: "test",
        password: "test",
      });
      const jwtService = new JwtServiceMock();
      const protectedMiddleware = new Protected(
        jwtService,
        userService,
        "token"
      );

      const [isValid] = await protectedMiddleware.check(request as Request);

      expect(isValid).is.true;
    });
    it("When token placed in cookies, and it valid, expect request will valid", async () => {
      const request: Partial<Request> = {
        headers: {},
        cookies: { token: "dsadasdasd" },
      };

      const userService = new UserServiceMock({
        email: "test",
        password: "test",
      });
      const jwtService = new JwtServiceMock();
      const protectedMiddleware = new Protected(
        jwtService,
        userService,
        "token"
      );

      const [isValid] = await protectedMiddleware.check(request as Request);

      expect(isValid).is.true;
    });
    it("When authorization header is empty, expect error 'Provide valid authorization'", async () => {
      const request: Partial<Request> = {
        headers: {},
        cookies: {},
      };

      const userService = new UserServiceMock({
        email: "test",
        password: "test",
      });
      const jwtService = new JwtServiceMock();
      const protectedMiddleware = new Protected(
        jwtService,
        userService,
        "token"
      );

      const [, error] = await protectedMiddleware.check(request as Request);

      expect(error).is.equal("Provide valid authorization");
    });
    it("When basic auth is provided but it's wrong, expect error 'Provide valid login or password'", async () => {
      const request: Partial<Request> = {
        headers: {
          authorization: "Basic test:test",
        },
        cookies: {},
      };

      const userService = new UserServiceMock({
        email: "test",
        password: "test",
      });
      userService.login = () => {
        throw new Error();
      };
      const jwtService = new JwtServiceMock();
      const protectedMiddleware = new Protected(
        jwtService,
        userService,
        "token"
      );

      const [, error] = await protectedMiddleware.check(request as Request);

      expect(error).is.equal("Provide valid login or password");
    });
    it("When bearer auth is provided but it's wrong, expect error 'Provide valid token'", async () => {
      const request: Partial<Request> = {
        headers: {
          authorization: "Bearer dasdwqwe123213213",
        },
        cookies: {},
      };

      const userService = new UserServiceMock({
        email: "test",
        password: "test",
      });
      const jwtService = new JwtServiceMock();
      jwtService.verify = () => {
        throw new Error();
      };
      const protectedMiddleware = new Protected(
        jwtService,
        userService,
        "token"
      );

      const [, error] = await protectedMiddleware.check(request as Request);

      expect(error).is.equal("Provide valid token");
    });
    it("When token placed in cookies, but it invalid, expect error 'Invalid token. Please re-login'", async () => {
      const request: Partial<Request> = {
        headers: {},
        cookies: { token: "dsadasdasd" },
      };
      const userService = new UserServiceMock({
        email: "test",
        password: "test",
      });
      const jwtService = new JwtServiceMock();
      jwtService.verify = () => {
        throw new Error();
      };
      const protectedMiddleware = new Protected(
        jwtService,
        userService,
        "token"
      );

      const [, error] = await protectedMiddleware.check(request as Request);

      expect(error).is.equal("Invalid token. Please re-login");
    });
  });
});
