import { Module } from '@nestjs/common';

import { BaseModule } from './modules/base/base.module';

@Module({
  imports: [BaseModule],
})
export class UsersModule {}
