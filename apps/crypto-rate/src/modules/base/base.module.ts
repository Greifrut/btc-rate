import { Module } from '@nestjs/common';
import { BaseController } from './controllers/base.controller';
import { CommonModule } from '../common/common.module';
import { BTC_SERVICE, REQUEST_SERVICE } from '../../constants/symbols';
import { ConfigService } from '../common/services/config.service';
import { IRequest } from '../../typings/interfaces/IRequest';
import { BtcService } from './services/btc.service';

const btcService = {
  provide: BTC_SERVICE,
  useFactory: (configService: ConfigService, requestService: IRequest) => {
    return new BtcService(requestService, configService.get('btcApi'));
  },
  inject: [ConfigService, REQUEST_SERVICE],
};

@Module({
  imports: [CommonModule],
  controllers: [BaseController],
  providers: [btcService],
})
export class BaseModule {}
