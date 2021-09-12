import { Module } from '@nestjs/common';
import axios from 'axios';

import { ConfigService } from '../../../../__config__/config.service';
import { RequestService } from './services/request.service';
import { REQUEST_SERVICE } from '../../constants/symbols';

const requestService = {
  provide: REQUEST_SERVICE,
  useFactory: () => {
    return new RequestService(axios);
  },
};

@Module({
  providers: [ConfigService, requestService],
  exports: [ConfigService, requestService],
})
export class CommonModule {}
