import { Column, Entity, ManyToOne } from 'typeorm';
import { EntityBasic } from './base.entity';
import { IsNotEmpty, IsString } from 'class-validator';
import { Posts } from './post.entity';

@Entity('attachments')
export class Attachments extends EntityBasic {
  @IsString()
  @IsNotEmpty()
  @Column()
  url?: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  originalname?: string;

  @IsString()
  @IsNotEmpty()
  @Column({ select: false })
  postId?: string;

  @ManyToOne(() => Posts, (post) => post.attachments)
  post?: Posts;
}
