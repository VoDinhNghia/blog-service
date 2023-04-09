import { Column, Entity, ManyToOne } from 'typeorm';
import { EntityBasic } from './base.entity';
import { IsString } from 'class-validator';
import { User } from './user.entity';
import { StudyGroups } from './study-group.entity';

@Entity('study_group_members')
export class StudyGroupMembers extends EntityBasic {
  @IsString()
  @Column()
  groupId?: string;

  @IsString()
  @Column()
  memberId?: string;

  @ManyToOne(() => User, (user) => user.members)
  member?: User;

  @ManyToOne(() => StudyGroups, (group) => group.members)
  group?: StudyGroups;
}
