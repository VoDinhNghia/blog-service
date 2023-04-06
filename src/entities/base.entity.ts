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

  @Column({ type: 'datetime', default: () => 'NOW()', select: false })
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'NOW()', select: false })
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, type: 'datetime', select: false })
  deletedAt?: Date;
}
