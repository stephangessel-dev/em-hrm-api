import { IsNumber, Min, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class HighHeartRateQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  threshold?: number = 100;
}