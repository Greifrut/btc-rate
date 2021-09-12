import { ClientProxy } from '@nestjs/microservices';
import { Module } from '@nestjs/common';

import { BaseController } from './controllers/base.controller';
import {
  DATABASE,
  JWT_SERVICE,
  LOGGER_CLIENT,
  USER_SERVICE,
  VERIFY_USER_SERVICE,
} from '../../constants/symbols';
import { UserService } from './services/user.service';
import { IDb } from '../../typings/interfaces/IDB';
import { CommonModule } from '../common/common.module';
import { VerifyUserService } from './services/verify.service';
import { IJwtService } from '../../typings/interfaces/IJwtService';
import { IUserService } from '../../typings/interfaces/IUserService';
import { ConfigService } from '../../../../__config__/config.service';

const userService = {
  provide: USER_SERVICE,
  useFactory: (database: IDb, loggerClient: ClientProxy) => {
    return new UserService(database, 'users', loggerClient);
  },
  inject: [DATABASE, LOGGER_CLIENT],
};

const verifyUserService = {
  provide: VERIFY_USER_SERVICE,
  useFactory: (
    jwtService: IJwtService,
    userService: IUserService,
    config: ConfigService,
  ) => {
    return new VerifyUserService(
      jwtService,
      userService,
      config.get('cookieName'),
    );
  },
  inject: [JWT_SERVICE, USER_SERVICE, ConfigService],
};

@Module({
  imports: [CommonModule],
  controllers: [BaseController],
  providers: [verifyUserService, userService],
})
export class BaseModule {}
