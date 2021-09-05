import { ClientGrpc, ClientProxy } from '@nestjs/microservices';

export interface IApiGatewayController {
  readonly userClient: ClientProxy;
  readonly cryptoClient: ClientGrpc;

  registerUser(): Promise<unknown>;

  loginUser(): Promise<unknown>;

  getBtcRate(): Promise<unknown>;
}
