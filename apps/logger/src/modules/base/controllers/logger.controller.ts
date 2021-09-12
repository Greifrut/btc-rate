import { Controller, Get } from '@nestjs/common';
import { LoggerService } from '../services/logger.service';

@Controller()
export class LoggerController {
  constructor(private readonly loggerService: LoggerService) {}

  @Get()
  getHello(): string {
    return this.loggerService.getHello();
  }
}