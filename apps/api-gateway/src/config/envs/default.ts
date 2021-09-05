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
};
