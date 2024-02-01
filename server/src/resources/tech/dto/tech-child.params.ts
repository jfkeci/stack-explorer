import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

export class TechChildParams {
  @IsInt()
  @IsPositive()
  @ApiProperty()
  techId: number;

  @IsInt()
  @IsPositive()
  @ApiProperty()
  childId: number;
}
