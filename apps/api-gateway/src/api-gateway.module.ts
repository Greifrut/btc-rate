import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './config/configuration';
import { BaseModule } from './modules/base/base.module';
import { CommonModule } from './modules/common/common.module';
import { MicroserviceModule } from './modules/microservice/microservice.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    CommonModule,
    MicroserviceModule,
    BaseModule,
  ],
})
export class ApiGatewayModule {}
