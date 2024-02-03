import { TechTag } from '../enum/tech-tag.enum';
import { TechType } from '../enum/tech-type.enum';
import { Column, Entity, ManyToMany, JoinTable, PrimaryGeneratedColumn } from 'typeorm';

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
    default: TechTag.OTHERS,
  })
  type: TechType;

  @Column('enum', {
    array: true,
    default: [],
    enum: TechTag,
  })
  tags: TechTag[];

  @ManyToMany(() => TechEntity, (tech) => tech.children)
  @JoinTable()
  parents: TechEntity[];

  @ManyToMany(() => TechEntity, (tech) => tech.parents)
  children: TechEntity[];
}
