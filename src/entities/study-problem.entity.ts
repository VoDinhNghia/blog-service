import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { EntityBasic } from './base.entity';
import { IsString } from 'class-validator';
import { User } from './user.entity';
import { StudyTopics } from './study-topic.entity';
import { StudySolutions } from './study-solution.entity';

@Entity('study_problems')
export class StudyProblems extends EntityBasic {
  @IsString()
  @Column({ length: 500 })
  problem?: string;

  @IsString()
  @Column()
  topicId?: string;

  @IsString()
  @Column()
  createById?: string;

  @ManyToOne(() => User, (user) => user.studyProblems)
  createBy?: User;

  @ManyToOne(() => StudyTopics, (topic) => topic.studyProblems)
  topic?: StudyTopics;

  @OneToMany(() => StudySolutions, (solution) => solution.problem)
  solutions?: StudySolutions[];
}
