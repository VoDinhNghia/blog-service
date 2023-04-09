import { Column, Entity, ManyToOne } from 'typeorm';
import { EntityBasic } from './base.entity';
import { IsNotEmpty, IsString } from 'class-validator';
import { User } from './user.entity';

@Entity('follows')
export class Follows extends EntityBasic {
  @IsString()
  @IsNotEmpty()
  @Column()
  userFollowId?: string; // people who are following

  @IsString()
  @IsNotEmpty()
  @Column()
  userFollowedId?: string; // the person being followed

  @ManyToOne(() => User, (user) => user.follow)
  userFollow?: User;

  @ManyToOne(() => User, (user) => user.followed)
  userFollowed?: User;
}
