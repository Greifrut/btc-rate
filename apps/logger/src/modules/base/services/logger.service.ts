import { Injectable } from '@nestjs/common';
import { Log } from '../../../typings/types/Log';

@Injectable()
export class LoggerService {
  private readonly logs: Log[] = [];

  saveLog(log: Log) {
    this.logs.push(log);
  }

  stdoutLog(log: Log) {
    console.log(JSON.stringify(log));
  }
}
