import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { EntityBasic } from './base.entity';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { Likes } from './like.entity';
import { Posts } from './post.entity';
import { User } from './user.entity';

@Entity('shares')
export class Shares extends EntityBasic {
  @IsString()
  @IsNotEmpty()
  @Column({ select: false })
  userId?: string;

  @IsString()
  @IsNotEmpty()
  @Column({ select: false })
  postId?: string;

  @IsBoolean()
  @Column({ default: false })
  privateMode?: boolean;

  @OneToMany(() => Likes, (like) => like.share, {
    cascade: ['soft-remove', 'recover'],
  })
  likes?: Likes[];

  @ManyToOne(() => Posts, (post) => post.shares)
  post?: Posts;

  @ManyToMany(() => User, (user) => user.shares)
  users?: User[];
}
