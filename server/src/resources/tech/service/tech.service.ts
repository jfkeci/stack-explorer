import { InjectRepository } from '@nestjs/typeorm';
import { TechEntity } from '../entity/tech.entity';
import { TechUtilsService } from './tech-utils.service';
import { CreateTechParams } from '../interface/create-tech.interface';
import { FindOptionsRelations, In, Repository, UpdateResult } from 'typeorm';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class TechService {
  constructor(
    @InjectRepository(TechEntity)
    private readonly techRepo: Repository<TechEntity>,
    public techUtils: TechUtilsService,
  ) {}

  async getTechById(
    techId: number,
    relations?: FindOptionsRelations<TechEntity>,
  ): Promise<TechEntity> {
    const tech = await this.techRepo.findOne({
      where: { id: techId },
      relations: relations ?? ['children'],
    });

    if (!tech) throw new NotFoundException('Tech not found');

    return tech;
  }

  async getTech(relations?: FindOptionsRelations<TechEntity>): Promise<TechEntity[]> {
    return await this.techRepo.find({ relations: relations ?? ['children'] });
  }

  async createRecord(data: CreateTechParams): Promise<TechEntity> {
    if (data.parents) {
      const parentsCheck = await this.techRepo.find({
        where: { id: In(data.parents) },
      });

      const missingParents = parentsCheck.filter((parent) => !data.parents.includes(parent.id));

      if (missingParents.length > 0) {
        throw new NotFoundException('Parent not found');
      }
    }

    if (data.children) {
      const childrenCheck = await this.techRepo.find({
        where: { id: In(data.children) },
      });

      const missingChildren = childrenCheck.filter((child) => !data.children.includes(child.id));

      if (missingChildren.length > 0) {
        throw new NotFoundException('Child not found');
      }
    }

    return await this.techRepo.save({
      children: this.techUtils.formatChildren(data.children),
      parent: this.techUtils.formatParents(data.parents),
      description: data.description,
      category: data.tags,
      name: data.name,
      type: data.type,
    });
  }

  async deleteRecord(techId: number): Promise<void> {
    const result = await this.techRepo.delete(techId);

    if (!!!result?.affected) throw new BadRequestException('Tech not found');
  }

  async findTechAndChild(techId: number, childId: number): Promise<TechEntity[]> {
    return await this.techRepo.find({
      where: { id: In([techId, childId]) },
      relations: ['children'],
    });
  }

  async findTechAndParent(techId: number, parentId: number): Promise<TechEntity[]> {
    return await this.techRepo.find({
      where: { id: In([techId, parentId]) },
      relations: ['parents'],
    });
  }

  async updateRecordChildren(techId: number, children: number[]): Promise<UpdateResult> {
    return await this.techRepo.update(techId, {
      children: this.techUtils.formatChildren(children),
    });
  }

  async updateRecordParents(techId: number, parents: number[]): Promise<UpdateResult> {
    return await this.techRepo.update(techId, {
      parents: this.techUtils.formatParents(parents),
    });
  }
}
