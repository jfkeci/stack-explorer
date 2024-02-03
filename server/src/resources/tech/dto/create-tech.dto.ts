import {
  IsInt,
  IsEnum,
  IsArray,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { TechTag } from '../enum/tech-tag.enum';
import { TechType } from '../enum/tech-type.enum';
import { CreateTechParams } from '../interface/create-tech.interface';

export class CreateTechDto implements CreateTechParams {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(TechType)
  @IsNotEmpty()
  type: TechType;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @IsEnum(TechTag, { each: true })
  tags: TechTag[];

  @IsArray()
  @IsOptional()
  @IsInt({ each: true })
  @IsPositive({ each: true })
  parents?: number[];

  @IsArray()
  @IsOptional()
  @IsInt({ each: true })
  @IsPositive({ each: true })
  children?: number[];
}
