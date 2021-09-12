import { Rate } from '../types/Rate';

type RateParams = {
  coins: number;
};

export interface IBtcService {
  getPrice({ coins }: RateParams): Promise<Rate>;
}
