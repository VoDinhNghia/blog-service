import { Column, Entity, ManyToOne } from 'typeorm';
import { EntityBasic } from './base.entity';
import { IsNotEmpty, IsString } from 'class-validator';
import { ElikeType } from '../constants/constant';
import { User } from './user.entity';
import { Posts } from './post.entity';
import { Shares } from './share.entity';

@Entity('likes')
export class Likes extends EntityBasic {
  @IsString()
  @IsNotEmpty()
  @Column()
  userId?: string;

  @IsString()
  @Column({ nullable: true })
  postId?: string;

  @IsString()
  @Column({ nullable: true })
  shareId?: string;

  @IsString()
  @IsNotEmpty()
  @Column({ default: ElikeType.POST })
  type?: string;

  @ManyToOne(() => User, (user) => user.likes)
  user?: User;

  @ManyToOne(() => Posts, (post) => post.likes)
  post?: Posts;

  @ManyToOne(() => Shares, (share) => share.likes)
  share?: Shares;
}
