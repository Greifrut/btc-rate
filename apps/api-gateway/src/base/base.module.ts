import { Module } from '@nestjs/common';

import { ApiGatewayController } from './controllers/api-gateway.controller';

@Module({
  controllers: [ApiGatewayController],
})
export class BaseModule {}
