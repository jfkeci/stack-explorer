import { Injectable } from '@nestjs/common';
import { TechEntity } from '../entity/tech.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class TechUtilsService {
  formatChildren(children?: number[]): TechEntity[] {
    if (!!!children?.length) return [];

    return plainToInstance(
      TechEntity,
      children.map((c) => ({ id: c })),
    );
  }

  formatParent(parentId?: number): TechEntity {
    if (!parentId) return null;

    return plainToInstance(TechEntity, { id: parentId });
  }
}
