import { IBtcService } from '../../../typings/interfaces/IBtcService';
import { IRequest } from '../../../typings/interfaces/IRequest';
import { Rate } from '../../../typings/types/Rate';
import { ClientProxy } from '@nestjs/microservices';

export class BtcService implements IBtcService {
  constructor(
    private readonly request: IRequest,
    private readonly url: string,
    private readonly loggerClient: ClientProxy,
  ) {}

  async getPrice({ coins = 1 }): Promise<Rate> {
    this.logInfo(
      `Crypto rate. BTC server request started. Number of coins: ${coins}`,
    );

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
      this.logError(`${Date.now()}: Crypto Rate. BTC server is unavailable`);

      throw new Error('BTC server is unavailable');
    }
  }

  private logInfo(message: string) {
    this.loggerClient.emit('info', { message });
  }

  private logError(message: string) {
    this.loggerClient.emit('error', { message });
  }
}
