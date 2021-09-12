import { Module } from '@nestjs/common';
import { LoggerController } from './controllers/logger.controller';
import { LoggerService } from './services/logger.service';

@Module({
  controllers: [LoggerController],
  providers: [LoggerService],
})
export class BaseModule {}
