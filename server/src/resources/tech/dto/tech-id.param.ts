import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';
import { IsInt, IsPositive, Min } from 'class-validator';

export class TechIdParam {
  @IsInt()
  @IsPositive()
  @Min(1)
  @ApiProperty({ minimum: 1, default: 123, required: true, description: 'Id url parameter' })
  @Transform(({ value }) => {
    if (isNaN(parseInt(value))) throw new BadRequestException('Invalid id param');

    return parseInt(value);
  })
  techId: number;
}
