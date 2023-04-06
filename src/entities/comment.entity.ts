import { Column, Entity, ManyToOne } from 'typeorm';
import { EntityBasic } from './base.entity';
import { IsString } from 'class-validator';
import { User } from './user.entity';
import { Posts } from './post.entity';

@Entity('comments')
export class Comments extends EntityBasic {
  @IsString()
  @Column({ length: 1000 })
  content?: string;

  @IsString()
  @Column({ select: false })
  postId?: string;

  @IsString()
  @Column({ select: false })
  userId?: string;

  @ManyToOne(() => Posts, (post) => post.comments)
  post?: Posts;

  @ManyToOne(() => User, (user) => user.comments)
  user?: User;
}
