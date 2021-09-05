import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class BaseController {
  @MessagePattern({ cmd: 'createUser' })
  createUser(): string {
    return 'createUser';
  }

  @MessagePattern({ cmd: 'loginUser' })
  loginUser(): string {
    return 'loginUser';
  }
}
