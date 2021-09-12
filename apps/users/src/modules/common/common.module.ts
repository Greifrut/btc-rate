import { Module } from '@nestjs/common';

import { ConfigService } from '../../../../__config__/config.service';
import { DATABASE, JWT_SERVICE } from '../../constants/symbols';
import { JwtService } from './services/jwt.service';
import { IDb } from '../../typings/interfaces/IDB';
import { TokenUtils } from '../../utils/token.util';
import { databaseConnector } from './db';
import { FileDB } from './db/fileDB';

const database = {
  provide: DATABASE,
  useFactory: () => {
    return databaseConnector.use(new FileDB(`${__dirname}/db/tables/`));
  },
};
const jwtService = {
  provide: JWT_SERVICE,
  useFactory: (database: IDb) => {
    return new JwtService(
      database,
      new TokenUtils(),
      'QLWfqsZLsvmgcVkaM4Ad34x0rm5y2xDK',
      'IapqQGqnCZclkO5VXZhtJehbTfwLAZ8J',
    );
  },
  inject: [DATABASE],
};

@Module({
  providers: [ConfigService, database, jwtService],
  exports: [ConfigService, database, jwtService],
})
export class CommonModule {}
