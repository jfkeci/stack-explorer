import { TechService } from './tech.service';
import { TechEntity } from '../entity/tech.entity';
import { ConflictException, NotFoundException } from '@nestjs/common';

export class TechRelationsService {
  constructor(private readonly techService: TechService) {}

  async appendChild(techId: number, childId: number): Promise<TechEntity> {
    if (techId === childId) {
      throw new ConflictException('Cant append child to itself');
    }

    const techs = await this.techService.findTechAndChild(techId, childId);

    const tech = techs.find((t) => t.id === techId);
    const child = techs.find((t) => t.id === childId);

    if (!tech) throw new NotFoundException('Tech not found');
    if (!child) throw new NotFoundException('Child not found');

    if (tech.children.some((c) => c.id === childId)) {
      throw new ConflictException('Child already appended');
    }

    const children = tech.children.map((c) => c.id);

    await this.techService.updateRecordChildren(techId, [
      ...children,
      child.id,
    ]);

    return { ...tech, children: [...tech.children, child] };
  }

  async removeChild(techId: number, childId: number): Promise<TechEntity> {
    const techs = await this.techService.findTechAndChild(techId, childId);

    const tech = techs.find((t) => t.id === techId);
    const child = techs.find((t) => t.id === childId);

    if (!tech) throw new NotFoundException('Tech not found');
    if (!child) throw new NotFoundException('Child not found');

    if (!tech.children.some((c) => c.id === childId)) {
      throw new ConflictException('Child not found');
    }

    const children = tech.children.map((c) => c.id);

    await this.techService.updateRecordChildren(
      techId,
      children.filter((c) => c !== childId),
    );

    return { ...tech, children: tech.children.filter((c) => c.id !== childId) };
  }
}
