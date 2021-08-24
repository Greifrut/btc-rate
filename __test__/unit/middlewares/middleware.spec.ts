import * as chai from "chai";
import * as spies from "chai-spies";
import { Request, Response } from "express";

import { Middleware } from "../../../src/middlewares/middleware";
import { MiddlewareProviderMock } from "../../mocks/middleware-provider.mock";

chai.use(spies);

const { expect } = chai;

describe("Middleware", () => {
  describe("#use", () => {
    it("When middleware provider validation is successful, expect next function will called", async () => {
      const request = {} as Request;
      const response = {} as Response;
      const next = chai.spy(() => undefined);
      const middleware = new Middleware(
        new MiddlewareProviderMock([true, null])
      );

      await middleware.use(request, response, next);

      expect(next).to.have.been.called();
    });
    it("When middleware provider validation is failed, expect error 'Your token is invalid'", async () => {
      const request = {} as Request;
      const response = {
        status(code: number) {
          return this;
        },
        send() {
          return undefined;
        },
      } as Response;
      const middleware = new Middleware(
        new MiddlewareProviderMock([false, null])
      );
      chai.spy.on(response, ["send"], () => undefined);

      await middleware.use(request, response, () => undefined);

      expect(response.send).to.have.been.called.with("Your token is invalid");
    });
    it("When middleware provider validation error, expect error", async () => {
      const request = {} as Request;
      const response = {
        status(code: number) {
          return this;
        },
        send() {
          return undefined;
        },
      } as Response;
      const middleware = new Middleware(
        new MiddlewareProviderMock([false, "Some Error"])
      );
      chai.spy.on(response, ["send"], () => undefined);

      await middleware.use(request, response, () => undefined);

      expect(response.send).to.have.been.called.with("Some Error");
    });
  });
});
