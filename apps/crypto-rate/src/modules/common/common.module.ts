import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Module } from '@nestjs/common';
import axios from 'axios';

import { ConfigService } from '../../../../__config__/config.service';
import { RequestService } from './services/request.service';
import { LOGGER_CLIENT, REQUEST_SERVICE } from '../../constants/symbols';

const loggerClient = {
  provide: LOGGER_CLIENT,
  useFactory: (configService: ConfigService) => {
    const user = configService.get('rmq.user');
    const password = configService.get('rmq.password');
    const host = configService.get('rmq.host');
    const queueName = configService.get('rmq.queueName');

    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${user}:${password}@${host}`],
        queue: queueName,
        queueOptions: {
          durable: false,
        },
      },
    });
  },
  inject: [ConfigService],
};

const requestService = {
  provide: REQUEST_SERVICE,
  useFactory: () => {
    return new RequestService(axios);
  },
};

@Module({
  providers: [ConfigService, requestService, loggerClient],
  exports: [ConfigService, requestService, loggerClient],
})
export class CommonModule {}
