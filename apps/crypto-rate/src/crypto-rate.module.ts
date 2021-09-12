import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { BaseModule } from './modules/base/base.module';
import configuration from '../../__config__/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    BaseModule,
  ],
})
export class CryptoRateModule {}
