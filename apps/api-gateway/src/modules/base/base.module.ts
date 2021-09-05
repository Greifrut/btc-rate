import { Module } from '@nestjs/common';

import { BaseController } from './controllers/base.controller';
import { MicroserviceModule } from '../microservice/microservice.module';

@Module({
  imports: [MicroserviceModule],
  controllers: [BaseController],
})
export class BaseModule {}
