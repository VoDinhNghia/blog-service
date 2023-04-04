import { Column, Entity } from 'typeorm';
import { EntityBasic } from './base.entity';
import { IsNotEmpty, IsString } from 'class-validator';

@Entity('posts')
export class Posts extends EntityBasic {
  @IsString()
  @IsNotEmpty()
  @Column({ length: 200 })
  title?: string;
}
