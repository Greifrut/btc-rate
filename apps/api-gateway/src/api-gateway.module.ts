import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MicroserviceModule } from './modules/microservice/microservice.module';
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
    MicroserviceModule,
    BaseModule,
  ],
})
export class ApiGatewayModule {}
