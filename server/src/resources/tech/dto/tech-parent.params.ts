import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';

export class TechParentParams {
  @IsInt()
  @IsPositive()
  @ApiProperty()
  @Transform(({ value }) => (isNaN(parseInt(value)) ? value : parseInt(value)))
  techId: number;

  @IsInt()
  @IsPositive()
  @ApiProperty()
  @Transform(({ value }) => (isNaN(parseInt(value)) ? value : parseInt(value)))
  parentId: number;
}
