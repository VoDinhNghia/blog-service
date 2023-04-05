import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { EntityBasic } from './base.entity';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { Attachments } from './attachment.entity';
import { User } from './user.entity';
import { Likes } from './like.entity';
import { Shares } from './share.entity';

@Entity('posts')
export class Posts extends EntityBasic {
  @IsString()
  @IsNotEmpty()
  @Column({ length: 200 })
  title?: string;

  @IsString()
  @IsNotEmpty()
  @Column({ length: 3000 })
  content?: string;

  @IsString()
  @IsNotEmpty()
  @Column({ nullable: false })
  userId?: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  type?: string;

  @IsBoolean()
  @Column({ default: false })
  privateMode?: boolean;

  @OneToMany(() => Attachments, (attachment) => attachment.post, {
    cascade: ['soft-remove', 'recover'],
  })
  attachments?: Attachments[];

  @ManyToOne(() => User, (user) => user.posts)
  user?: User;

  @OneToMany(() => Likes, (like) => like.post, {
    cascade: ['soft-remove', 'recover'],
  })
  likes?: Likes[];

  @OneToMany(() => Shares, (share) => share.post, {
    cascade: ['soft-remove', 'recover'],
  })
  shares?: Shares[];
}
