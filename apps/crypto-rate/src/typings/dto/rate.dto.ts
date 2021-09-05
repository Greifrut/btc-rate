import { IsInt } from 'class-validator';

export class RateDto {
  @IsInt()
  coins: number;
}
