import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { EntityBasic } from './base.entity';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
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

  @IsBoolean()
  @Column({ default: false })
  privateMode?: boolean;

  @IsString()
  @Column({ select: false })
  createById?: string;

  @IsString()
  @Column({ select: false })
  groupId?: string;

  @ManyToOne(() => User, (user) => user.studyTopics)
  createBy?: User;

  @ManyToOne(() => StudyGroups, (group) => group.topics)
  group?: StudyGroups;

  @OneToMany(() => StudyProblems, (problem) => problem.topic)
  studyProblems?: StudyProblems[];
}
