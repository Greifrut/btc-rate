import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { IBaseController } from '../../../typings/interfaces/IBaseController';
import { RateDto } from '../../../typings/dto/rate.dto';
import { Rate } from '../../../typings/types/Rate';
import { BTC_SERVICE } from '../../../constants/symbols';
import { IBtcService } from '../../../typings/interfaces/IBtcService';

@Controller()
export class BaseController implements IBaseController {
  constructor(@Inject(BTC_SERVICE) private readonly btcService: IBtcService) {}

  @GrpcMethod('CryptoRateService', 'getRate') getRate(
    data: RateDto,
  ): Promise<Rate> {
    return this.btcService.getPrice(data);
  }
}
