import { IsInt, IsPositive } from 'class-validator';

export class TechIdParam {
  @IsInt()
  @IsPositive()
  techId: number;
}
