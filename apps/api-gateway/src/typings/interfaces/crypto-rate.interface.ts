import { Observable } from 'rxjs';
import { Rate } from '../types/Rate';

export interface CryptoRateInterface {
  getRate({ coins: number }): Observable<Rate>;
}
