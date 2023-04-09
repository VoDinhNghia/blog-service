import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Length, IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { cryptoPassWord } from '../constants/constants.cryto';
import { Posts } from './post.entity';
import { Likes } from './like.entity';
import { Shares } from './share.entity';
import { Follows } from './follow.entity';
import { Comments } from './comment.entity';
import { StudyTopics } from './study-topic.entity';
import { StudyProblems } from './study-problem.entity';
import { StudySolutions } from './study-solution.entity';
import { StudyGroups } from './study-group.entity';
import { StudyGroupMembers } from './study-group-member.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, select: false })
  @IsEmail()
  @Length(4, 50)
  email: string;

  @Column({ select: false })
  @IsNotEmpty()
  @IsString()
  @Length(4, 100)
  password: string;

  @Column({ select: false }) // when want to response this field then add this field into select in find or findOne ...
  @IsNotEmpty()
  role: string;

  @Column({ select: false })
  @IsNotEmpty()
  @IsString()
  status: string;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ nullable: true })
  middleName?: string;

  @Column({ select: false })
  userId?: string;

  @Column({ select: false })
  code?: string;

  @Column({ select: false })
  profileId?: string;

  @Column({ default: false, select: false })
  isDeleted?: boolean;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ nullable: true, select: false })
  mobile?: string;

  @Column({ type: 'datetime', default: () => 'NOW()', select: false })
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'NOW()', select: false })
  updatedAt: Date;

  @OneToMany(() => Posts, (post) => post.user, {
    cascade: ['soft-remove', 'recover'],
  })
  posts?: Posts[];

  @OneToMany(() => Likes, (like) => like.user, {
    cascade: ['soft-remove', 'recover'],
  })
  likes?: Likes[];

  @OneToMany(() => Shares, (share) => share.user, {
    cascade: ['soft-remove', 'recover'],
  })
  shares?: Shares[];

  @OneToMany(() => Follows, (follow) => follow.userFollow, {
    cascade: ['soft-remove', 'recover'],
  })
  follow?: Follows[];

  @OneToMany(() => Follows, (follow) => follow.userFollowed, {
    cascade: ['soft-remove', 'recover'],
  })
  followed?: Follows[];

  @OneToMany(() => Comments, (comment) => comment.user, {
    cascade: ['soft-remove', 'recover'],
  })
  comments?: Comments[];

  @OneToMany(() => StudyTopics, (topic) => topic.createdBy, {
    cascade: ['soft-remove', 'recover'],
  })
  studyTopics?: StudyTopics[];

  @OneToMany(() => StudyProblems, (problem) => problem.createBy, {
    cascade: ['soft-remove', 'recover'],
  })
  studyProblems?: StudyProblems[];

  @OneToMany(() => StudySolutions, (solution) => solution.createBy, {
    cascade: ['soft-remove', 'recover'],
  })
  studySolutions?: StudyProblems[];

  @OneToMany(() => StudyGroups, (group) => group.createdBy, {
    cascade: ['soft-remove', 'recover'],
  })
  group?: StudyGroups[];

  @OneToMany(() => StudyGroupMembers, (groupMember) => groupMember.member, {
    cascade: ['soft-remove', 'recover'],
  })
  members?: StudyGroupMembers[];

  hashPassword() {
    this.password = cryptoPassWord(this.password);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    const pass = cryptoPassWord(unencryptedPassword);
    if (pass === this.password) {
      return true;
    }
    return false;
  }
}
