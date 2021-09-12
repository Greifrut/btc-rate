import { Module } from '@nestjs/common';

import { BaseController } from './controllers/base.controller';
import { MicroserviceModule } from '../microservice/microservice.module';
import { VerificationGuard } from './gurds/verification.guard';

@Module({
  imports: [MicroserviceModule],
  controllers: [BaseController],
  providers: [VerificationGuard],
})
export class BaseModule {}
