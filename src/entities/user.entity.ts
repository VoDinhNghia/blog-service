import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Length, IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { cryptoPassWord } from '../constants/constants.cryto';
import { Posts } from './post.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @IsEmail()
  @Length(4, 50)
  email: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  @Length(4, 100)
  password: string;

  @Column()
  @IsNotEmpty()
  role: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  status: string;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ nullable: true })
  middleName?: string;

  @Column()
  userId?: string;

  @Column()
  code?: string;

  @Column()
  profileId?: string;

  @Column({ default: false })
  isDeleted?: boolean;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ nullable: true })
  mobile?: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Posts, (post) => post.user)
  posts?: Posts[];

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
