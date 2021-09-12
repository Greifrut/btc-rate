import { Controller } from '@nestjs/common';
import { LoggerService } from '../services/logger.service';
import { EventPattern } from '@nestjs/microservices';
import { LogDto } from '../../../typings/dto/LogDto';

@Controller()
export class LoggerController {
  constructor(private readonly loggerService: LoggerService) {}

  @EventPattern('info')
  infoLog(log: LogDto) {
    this.loggerService.saveLog({ type: 'info', ...log });
  }

  @EventPattern('debug')
  debugLog(log: LogDto) {
    this.loggerService.saveLog({ type: 'debug', ...log });
  }

  @EventPattern('error')
  errorLog(log: LogDto) {
    this.loggerService.stdoutLog({ type: 'error', ...log });
  }
}
