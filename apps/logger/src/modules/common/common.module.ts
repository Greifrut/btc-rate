import { Module } from '@nestjs/common';

import { ConfigService } from '../../../../__config__/config.service';

@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class CommonModule {}
