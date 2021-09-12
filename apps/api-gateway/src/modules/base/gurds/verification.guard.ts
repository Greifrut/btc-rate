import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { USER_MICROSERVICE } from '../../../constants/symbols';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable()
export class VerificationGuard implements CanActivate {
  constructor(
    @Inject(USER_MICROSERVICE) private readonly userClient: ClientProxy,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const $verifyResponse = this.userClient.send({ cmd: 'verify' }, request);

    return lastValueFrom($verifyResponse);
  }
}
