import { Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientGrpc, ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, timeout } from 'rxjs';

import { IApiGatewayController } from '../../typings/interfaces/api-gateway-controller.interface';
import {
  CRYPTO_RATE_MICROSERVICE,
  USER_MICROSERVICE,
} from '../../constants/symbols';
import { CryptoRateInterface } from '../../typings/interfaces/crypto-rate.interface';

@Controller()
export class ApiGatewayController implements IApiGatewayController {
  constructor(
    @Inject(USER_MICROSERVICE)
    readonly userClient: ClientProxy,
    @Inject(CRYPTO_RATE_MICROSERVICE)
    readonly cryptoClient: ClientGrpc,
  ) {}

  @Post('/user/create') registerUser() {
    const response$ = this.userClient
      .send('createUser', {})
      .pipe(timeout(2000));

    return lastValueFrom(response$);
  }

  @Post('/user/login') loginUser() {
    const response$ = this.userClient.send('loginUser', {}).pipe(timeout(2000));

    return lastValueFrom(response$);
  }

  @Get('btcRate') getBtcRate() {
    const cryptoGRPC =
      this.cryptoClient.getService<CryptoRateInterface>('CryptoRateService');
    const response$ = cryptoGRPC.getRate({ coins: 1 }).pipe(timeout(2000));

    return lastValueFrom(response$);
  }
}
