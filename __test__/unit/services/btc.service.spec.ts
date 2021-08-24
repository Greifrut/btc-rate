import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import { BtcService } from "../../../src/services/btc.service";
import { RequestMock } from "../../mocks/request.mock";
chai.use(chaiAsPromised);

const { expect } = chai;

describe("BTC service", () => {
  describe("#getRate", () => {
    it("When called without coins, expect return a current btc rate for 1 coin", async () => {
      const btcService = new BtcService(new RequestMock(), "");

      const btcResponse = await btcService.getPrice({ coins: 1 });

      expect(btcResponse).is.deep.equal({
        btcValue: 1,
        rate: 1,
      });
    });
    it("When called with coins, expect return a current btc rate for coins", async () => {
      const btcService = new BtcService(new RequestMock(), "");

      const btcResponse = await btcService.getPrice({ coins: 2 });

      expect(btcResponse).is.deep.equal({
        btcValue: 2,
        rate: 2,
      });
    });
    it("When getRate is called, but btc server is didn't response, expect error 'BTC server is unavailable'", async () => {
      const request = new RequestMock();
      request.get = () => Promise.reject(new Error());
      const btcService = new BtcService(request, "");

      await expect(btcService.getPrice({ coins: 2 })).to.be.rejectedWith(
        "BTC server is unavailable"
      );
    });
  });
});
