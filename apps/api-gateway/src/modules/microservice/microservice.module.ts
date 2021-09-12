import { Module } from '@nestjs/common';
import {
  ClientOptions,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

import {
  CRYPTO_RATE_MICROSERVICE,
  USER_MICROSERVICE,
} from '../../constants/symbols';
import { CommonModule } from '../common/common.module';
import { ConfigService } from '../../../../__config__/config.service';

const UserMicroservice = {
  provide: USER_MICROSERVICE,
  useFactory: (configService: ConfigService) => {
    const options: ClientOptions = {
      transport: Transport.TCP,
      options: configService.get('microservices.users'),
    };
    return ClientProxyFactory.create(options);
  },
  inject: [ConfigService],
};

const CryptoMicroservice = {
  provide: CRYPTO_RATE_MICROSERVICE,
  useFactory: (configService: ConfigService) => {
    const options: ClientOptions = {
      transport: Transport.GRPC,
      options: configService.get('microservices.cryptoRate'),
    };

    return ClientProxyFactory.create(options);
  },
  inject: [ConfigService],
};

@Module({
  imports: [CommonModule],
  providers: [UserMicroservice, CryptoMicroservice],
  exports: [UserMicroservice, CryptoMicroservice],
})
export class MicroserviceModule {}
