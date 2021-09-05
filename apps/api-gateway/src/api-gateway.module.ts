import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { BaseModule } from './base/base.module';
import { CommonModule } from './common/common.module';
import {
  ClientOptions,
  ClientProxyFactory,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';
import {
  CRYPTO_RATE_MICROSERVICE,
  USER_MICROSERVICE,
} from './constants/symbols';
import { join } from 'path';
import { ConfigService } from './common/services/config.service';

const UserMicroservice = {
  provide: USER_MICROSERVICE,
  useFactory: (configService: ConfigService) => {
    const options: ClientOptions = {
      transport: Transport.TCP,
      options: {
        host: configService.get('microservices.users.host'),
        port: configService.get('microservices.users.port'),
      },
    };
    return ClientProxyFactory.create(options);
  },
  inject: [ConfigService],
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    ClientsModule.register([
      {
        name: CRYPTO_RATE_MICROSERVICE,
        transport: Transport.GRPC,
        options: {
          package: 'CryptoRateService',
          protoPath: join(__dirname, 'proto/crypto-rate.proto'),
        },
      },
    ]),
    CommonModule,
    BaseModule,
  ],
  providers: [UserMicroservice],
})
export class ApiGatewayModule {}
