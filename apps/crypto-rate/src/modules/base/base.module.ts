import { ClientProxy } from '@nestjs/microservices';
import { Module } from '@nestjs/common';

import {
  BTC_SERVICE,
  LOGGER_CLIENT,
  REQUEST_SERVICE,
} from '../../constants/symbols';
import { ConfigService } from '../../../../__config__/config.service';
import { BaseController } from './controllers/base.controller';
import { IRequest } from '../../typings/interfaces/IRequest';
import { CommonModule } from '../common/common.module';
import { BtcService } from './services/btc.service';

const btcService = {
  provide: BTC_SERVICE,
  useFactory: (
    configService: ConfigService,
    requestService: IRequest,
    loggerClient: ClientProxy,
  ) => {
    return new BtcService(
      requestService,
      configService.get('btcApi'),
      loggerClient,
    );
  },
  inject: [ConfigService, REQUEST_SERVICE, LOGGER_CLIENT],
};

@Module({
  imports: [CommonModule],
  controllers: [BaseController],
  providers: [btcService],
})
export class BaseModule {}
