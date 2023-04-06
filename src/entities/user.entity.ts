import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Length, IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { cryptoPassWord } from '../constants/constants.cryto';
import { Posts } from './post.entity';
import { Likes } from './like.entity';
import { Shares } from './share.entity';

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
