import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { CommonModule } from './modules/common/common.module';
import configuration from '../../__config__/configuration';
import { BaseModule } from './modules/base/base.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    CommonModule,
    BaseModule,
  ],
})
export class LoggerModule {}
