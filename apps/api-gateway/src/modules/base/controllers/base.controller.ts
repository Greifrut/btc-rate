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

@Controller()
export class BaseController implements IApiGatewayController {
  constructor(
    @Inject(USER_MICROSERVICE)
    readonly userClient: ClientProxy,
    @Inject(CRYPTO_RATE_MICROSERVICE)
    readonly cryptoClient: ClientGrpc,
  ) {}

  @Post('/user/create') registerUser(@Body() user: any) {
    const response$ = this.userClient
      .send({ cmd: 'createUser' }, user)
      .pipe(timeout(2000));

    return lastValueFrom(response$);
  }

  @Post('/user/login') loginUser(@Body() user: any) {
    const response$ = this.userClient
      .send({ cmd: 'loginUser' }, user)
      .pipe(timeout(2000));

    return lastValueFrom(response$);
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
