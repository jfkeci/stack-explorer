import { TechTag } from '../enum/tech-tag.enum';
import { TechType } from '../enum/tech-type.enum';

export interface CreateTechParams {
  name: string;
  description: string;
  type: TechType;
  tags: TechTag[];
  parents?: number[];
  children?: number[];
}
