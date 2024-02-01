import {
  IsInt,
  IsEnum,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { TechType } from '../enum/tech-type.enum';
import { TechCategory } from '../enum/tech-category.enum';

export class CreateTechDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(TechType)
  @IsNotEmpty()
  type: TechType;

  @IsEnum(TechCategory)
  @IsNotEmpty()
  category: TechCategory;

  @IsInt()
  @IsOptional()
  @IsPositive()
  parentId?: number;

  @IsInt()
  @IsOptional()
  @IsPositive()
  children?: number[];
}
