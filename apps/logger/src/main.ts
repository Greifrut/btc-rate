import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';

import { ConfigService } from '../../__config__/config.service';
import { LoggerModule } from './logger.module';

async function bootstrap() {
  const app = await NestFactory.create(LoggerModule);

  const configService = app.get<ConfigService>(ConfigService);

  const queueName = configService.get('rmq.queueName');
  const password = configService.get('rmq.password');
  const user = configService.get('rmq.user');
  const host = configService.get('rmq.host');

  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${user}:${password}@${host}`],
      queue: queueName,
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.startAllMicroservices();
}
bootstrap();
