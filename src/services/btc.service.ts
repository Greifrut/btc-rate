import { IRequest } from "../types/interfaces/IRequest";
import { IBtcService } from "../types/interfaces/IBtcService";

export class BtcService implements IBtcService {
  constructor(readonly request: IRequest, readonly url: string) {}

  async getPrice({ coins = 1 }) {
    try {
      const {
        data: {
          bpi: { UAH },
        },
      } = await this.request.get(this.url);

      return {
        btcValue: Number(coins),
        rate: Number(coins) * UAH.rate_float,
      };
    } catch (e) {
     throw new Error("BTC server is unavailable");
    }
  }
}
