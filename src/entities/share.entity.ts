import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { EntityBasic } from './base.entity';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { Likes } from './like.entity';
import { Posts } from './post.entity';
import { User } from './user.entity';

@Entity('shares')
export class Shares extends EntityBasic {
  @IsString()
  @IsNotEmpty()
  @Column()
  userId?: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  postId?: string;

  @IsBoolean()
  @Column({ default: false })
  privateMode?: boolean;

  @OneToMany(() => Likes, (like) => like.share)
  likes?: Likes[];

  @ManyToOne(() => Posts, (post) => post.shares)
  post?: Posts;

  @ManyToOne(() => User, (user) => user.shares)
  user?: User;
}
