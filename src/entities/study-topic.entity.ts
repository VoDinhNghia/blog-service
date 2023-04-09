import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { EntityBasic } from './base.entity';
import { IsNotEmpty, IsString } from 'class-validator';
import { User } from './user.entity';
import { StudyProblems } from './study-problem.entity';
import { StudyGroups } from './study-group.entity';

@Entity('study_topics')
export class StudyTopics extends EntityBasic {
  @IsString()
  @IsNotEmpty()
  @Column()
  name?: string;

  @IsString()
  @IsNotEmpty()
  @Column({ length: 2000 })
  description?: string;

  @IsString()
  @Column()
  createdById?: string;

  @IsString()
  @Column()
  groupId?: string;

  @ManyToOne(() => User, (user) => user.studyTopics)
  createdBy?: User;

  @ManyToOne(() => StudyGroups, (group) => group.topics)
  group?: StudyGroups;

  @OneToMany(() => StudyProblems, (problem) => problem.topic)
  studyProblems?: StudyProblems[];
}
