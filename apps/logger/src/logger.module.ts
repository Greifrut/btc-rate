import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { CommonModule } from './modules/common/common.module';
import { BaseModule } from './modules/base/base.module';
import configuration from './config/configuration';

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
