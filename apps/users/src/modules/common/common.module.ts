import { Module } from '@nestjs/common';

import { ConfigService } from '../../../../__config__/config.service';
import { DATABASE, JWT_SERVICE, LOGGER_CLIENT } from '../../constants/symbols';
import { JwtService } from './services/jwt.service';
import { IDb } from '../../typings/interfaces/IDB';
import { TokenUtils } from '../../utils/token.util';
import { databaseConnector } from './db';
import { FileDB } from './db/fileDB';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

const database = {
  provide: DATABASE,
  useFactory: () => {
    return databaseConnector.use(new FileDB(`${__dirname}/db/tables/`));
  },
};

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

const jwtService = {
  provide: JWT_SERVICE,
  useFactory: (database: IDb) => {
    return new JwtService(
      database,
      new TokenUtils(),
      'QLWfqsZLsvmgcVkaM4Ad34x0rm5y2xDK',
      'IapqQGqnCZclkO5VXZhtJehbTfwLAZ8J',
    );
  },
  inject: [DATABASE],
};

@Module({
  providers: [ConfigService, database, jwtService, loggerClient],
  exports: [ConfigService, database, jwtService, loggerClient],
})
export class CommonModule {}
