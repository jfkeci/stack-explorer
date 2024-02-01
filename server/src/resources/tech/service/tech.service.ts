import { DeleteResult, In, Repository, UpdateResult } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { TechType } from '../enum/tech-type.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { TechEntity } from '../entity/tech.entity';
import { TechUtilsService } from './tech-utils.service';
import { TechCategory } from '../enum/tech-category.enum';

@Injectable()
export class TechService {
  constructor(
    @InjectRepository(TechEntity)
    private readonly techRepo: Repository<TechEntity>,
    public techUtils: TechUtilsService,
  ) {}

  async createRecord(data: {
    name: string;
    description: string;
    type: TechType;
    category: TechCategory;
    parentId?: number;
    children?: number[];
  }) {
    return await this.techRepo.save({
      children: this.techUtils.formatChildren(data.children),
      parent: this.techUtils.formatParent(data.parentId),
      description: data.description,
      category: data.category,
      name: data.name,
      type: data.type,
    });
  }

  async deleteRecord(id: number): Promise<DeleteResult> {
    const check = await this.techRepo.findOne({ where: { id } });

    if (!check) throw new BadRequestException('Tech not found');

    return await this.techRepo.delete(check.id);
  }

  async findTechAndChild(
    techId: number,
    childId: number,
  ): Promise<TechEntity[]> {
    return await this.techRepo.find({
      where: { id: In([techId, childId]) },
      relations: ['children'],
    });
  }

  async updateRecordChildren(
    techId: number,
    children: number[],
  ): Promise<UpdateResult> {
    return await this.techRepo.update(techId, {
      children: this.techUtils.formatChildren(children),
    });
  }
}
