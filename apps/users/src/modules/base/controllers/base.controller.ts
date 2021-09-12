import { Controller, Inject } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import type { Request } from 'express';
import {
  JWT_SERVICE,
  USER_SERVICE,
  VERIFY_USER_SERVICE,
} from '../../../constants/symbols';
import { IVerifyService } from '../../../typings/interfaces/IVerifyService';
import { UserCredentials } from '../../../typings/types/UserCredentials';
import { IUserService } from '../../../typings/interfaces/IUserService';
import { IJwtService } from '../../../typings/interfaces/IJwtService';
import { UserDto } from '../../../typings/dto/user.dto';
import { User } from '../../../typings/types/User';
import { ServiceResponse } from '../../../../../typings/service-response.type';

@Controller()
export class BaseController {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: IUserService,
    @Inject(JWT_SERVICE) private readonly jwtService: IJwtService,
    @Inject(VERIFY_USER_SERVICE) private readonly verifyService: IVerifyService,
  ) {}

  private async processUser(
    userData: User,
    method: keyof IUserService,
  ): Promise<UserCredentials> {
    const user = await this.userService[method](userData);
    const token = this.jwtService.create(user);

    return {
      ...user,
      token,
    };
  }

  @MessagePattern({ cmd: 'createUser' })
  async createUser(
    userDto: UserDto,
  ): Promise<ServiceResponse<UserCredentials>> {
    try {
      const registerResponse = await this.processUser(userDto, 'register');
      return [registerResponse, null];
    } catch (e) {
      return [null, e.message];
    }
  }

  @MessagePattern({ cmd: 'loginUser' })
  async loginUser(userDto: UserDto): Promise<ServiceResponse<UserCredentials>> {
    try {
      const loginResponse = await this.processUser(userDto, 'login');
      return [loginResponse, null];
    } catch (e) {
      return [null, e.message];
    }
  }

  @MessagePattern({ cmd: 'verify' })
  async verify(request: Request) {
    return this.verifyService.check(request);
  }
}
