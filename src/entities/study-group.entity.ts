import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { EntityBasic } from './base.entity';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { StudyTopics } from './study-topic.entity';
import { User } from './user.entity';
import { StudyGroupMembers } from './study-group-member.entity';

@Entity('study_groups')
export class StudyGroups extends EntityBasic {
  @IsString()
  @IsNotEmpty()
  @Column()
  name?: string;

  @IsString()
  @Column({ length: 2000 })
  description?: string;

  @IsBoolean()
  @Column({ default: false })
  privateMode?: boolean;

  @IsString()
  @Column()
  createdById?: string;

  @ManyToOne(() => User, (user) => user.group)
  createdBy?: User;

  @OneToMany(() => StudyTopics, (topic) => topic.group, {
    cascade: ['soft-remove', 'recover'],
  })
  topics?: StudyTopics[];

  @OneToMany(() => StudyGroupMembers, (groupMember) => groupMember.group, {
    cascade: ['soft-remove', 'recover'],
  })
  members?: StudyGroupMembers[];
}
