import {
  Entity,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';
import { TechEntity } from '../../tech/entity/tech.entity';
import { RelatedTechRelation } from '../enum/related-tech-relation.enum';

@Entity({ name: 'relatedTechs' })
export class RelatedTechEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TechEntity)
  @JoinColumn({ name: 'techId' })
  tech: TechEntity;

  @ManyToOne(() => TechEntity)
  @JoinColumn({ name: 'relatedTechId' })
  relatedTech: TechEntity;

  @Column({ enum: RelatedTechRelation })
  relation: RelatedTechRelation;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
