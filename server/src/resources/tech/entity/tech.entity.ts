import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TechType } from '../enum/tech-type.enum';
import { TechCategory } from '../enum/tech-category.enum';

@Entity({ name: 'techs' })
export class TechEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 200 })
  description: string;

  @Column({
    type: 'enum',
    enum: TechType,
    default: TechCategory.OTHERS,
  })
  type: TechType;

  @Column({
    type: 'enum',
    enum: TechCategory,
  })
  category: TechCategory;

  @ManyToOne(() => TechEntity, (tech) => tech.children)
  parent: TechEntity;

  @OneToMany(() => TechEntity, (tech) => tech.parent)
  children: TechEntity[];
}
