import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { CryptoRateModule } from './base/crypto-rate.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

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
