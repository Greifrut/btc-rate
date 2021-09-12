import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpc, ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, timeout } from 'rxjs';

import { IApiGatewayController } from '../../../typings/interfaces/api-gateway-controller.interface';
import {
  CRYPTO_RATE_MICROSERVICE,
  USER_MICROSERVICE,
} from '../../../constants/symbols';
import { CryptoRateInterface } from '../../../typings/interfaces/crypto-rate.interface';
import { VerificationGuard } from '../gurds/verification.guard';
import { UserDto } from '../../../typings/dto/user.dto';
import { UserCredentials } from '../../../../../users/src/typings/types/UserCredentials';
import { ServiceResponse } from '../../../../../typings/service-response.type';

@Controller()
export class BaseController implements IApiGatewayController {
  constructor(
    @Inject(USER_MICROSERVICE)
    readonly userClient: ClientProxy,
    @Inject(CRYPTO_RATE_MICROSERVICE)
    readonly cryptoClient: ClientGrpc,
  ) {}

  @Post('/user/create')
  async registerUser(@Body() userDto: UserDto) {
    const response$ = this.userClient
      .send({ cmd: 'createUser' }, userDto)
      .pipe(timeout(2000));

    const [response, error] = await lastValueFrom<
      ServiceResponse<UserCredentials>
    >(response$);

    return {
      data: response,
      error,
    };
  }

  @Post('/user/login') async loginUser(@Body() userDto: UserDto) {
    const response$ = this.userClient
      .send({ cmd: 'loginUser' }, userDto)
      .pipe(timeout(2000));

    const [response, error] = await lastValueFrom<
      ServiceResponse<UserCredentials>
    >(response$);

    return {
      data: response,
      error,
    };
  }

  @Get('btcRate')
  @UseGuards(VerificationGuard)
  getBtcRate(@Query('coins') coins = 1) {
    const cryptoGRPC =
      this.cryptoClient.getService<CryptoRateInterface>('CryptoRateService');

    const response$ = cryptoGRPC.getRate({ coins: coins }).pipe(timeout(2000));

    return lastValueFrom(response$);
  }
}
