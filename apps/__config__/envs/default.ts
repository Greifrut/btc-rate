import { join } from 'path';

export const config = {
  microservices: {
    users: {
      host: '127.0.0.1',
      port: 3001,
    },
    cryptoRate: {
      package: 'cryptoRate',
      protoPath: join(
        __dirname,
        'modules/microservice/proto/crypto-rate.proto',
      ),
    },
  },
  btcApi: 'https://api.coindesk.com/v1/bpi/currentprice/UAH.json',
  cookieName: 'btcAppToken',
  rmq: {
    user: 'guest',
    password: 'guest',
    host: 'localhost:5672',
    queueName: 'logger_queue',
  },
};
