import { Column, Entity, ManyToOne } from 'typeorm';
import { EntityBasic } from './base.entity';
import { StudyProblems } from './study-problem.entity';
import { IsString } from 'class-validator';
import { User } from './user.entity';

@Entity('study_solutions')
export class StudySolutions extends EntityBasic {
  @IsString()
  @Column()
  problemId?: string;

  @IsString()
  @Column({ length: 2000 })
  solution?: string;

  @IsString()
  @Column()
  createdById?: string;

  @ManyToOne(() => User, (user) => user.studySolutions)
  createdBy?: User;

  @ManyToOne(() => StudyProblems, (problem) => problem.solutions, {
    onDelete: 'CASCADE',
  })
  problem?: StudyProblems;
}
