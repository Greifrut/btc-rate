import { IsString } from 'class-validator';

export class LogDto {
  @IsString()
  message: string;
}
