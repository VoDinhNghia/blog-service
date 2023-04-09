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
  @Column()
  createById?: string;

  @ManyToOne(() => User, (user) => user.studySolutions)
  createBy?: User;

  @ManyToOne(() => StudyProblems, (problem) => problem.solutions)
  problem?: StudyProblems;
}
