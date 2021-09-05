import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { CryptoRateModule } from './crypto-rate.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CryptoRateModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'cryptoRate',
        protoPath: join(__dirname, 'proto/crypto-rate.proto'),
      },
    },
  );
  await app.listen();
}
bootstrap();
