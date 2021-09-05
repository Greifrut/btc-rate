import { Module } from '@nestjs/common';
import { CryptoRateController } from './crypto-rate.controller';

@Module({
  controllers: [CryptoRateController],
})
export class CryptoRateModule {}
