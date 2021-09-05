import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { RateParams } from '../typings/types/RateParams';
import { Rate } from '../typings/types/Rate';

@Controller()
export class CryptoRateController {
  @GrpcMethod('CryptoRateService', 'getRate')
  getRate(data: RateParams): Rate {
    return {
      btcValue: 1,
      rate: 1,
    };
  }
}
