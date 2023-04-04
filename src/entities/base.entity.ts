import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
@Unique(['id'])
export class EntityBasic {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'datetime', default: () => 'NOW()' })
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'NOW()' })
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;
}
