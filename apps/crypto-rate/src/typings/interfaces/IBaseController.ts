import { RateParams } from '../types/RateParams';
import { Rate } from '../types/Rate';

export interface IBaseController {
  getRate(data: RateParams): Promise<Rate>;
}
