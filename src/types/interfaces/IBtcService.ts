import { IRequest } from "./IRequest";
import { BTCRate } from "../types/BTCRate";

export interface IBtcService {
  readonly request: IRequest;
  readonly url: string;

  getPrice({ coins }): Promise<BTCRate>;
}
