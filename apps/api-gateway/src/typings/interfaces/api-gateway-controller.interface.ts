import { ClientGrpc, ClientProxy } from '@nestjs/microservices';

export interface IApiGatewayController {
  readonly userClient: ClientProxy;
  readonly cryptoClient: ClientGrpc;

  registerUser(user: any): Promise<unknown>;

  loginUser(user: any): Promise<unknown>;

  getBtcRate(): Promise<unknown>;
}
