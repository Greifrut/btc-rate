import { IRequest } from './IRequest';
import { Rate } from '../types/Rate';

type RateParams = {
  coins: number;
};

export interface IBtcService {
  readonly request: IRequest;
  readonly url: string;

  getPrice({ coins }: RateParams): Promise<Rate>;
}
