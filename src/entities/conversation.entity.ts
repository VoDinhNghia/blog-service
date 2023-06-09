import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { EntityBasic } from './base.entity';
import { IsNotEmpty, IsString } from 'class-validator';
import { Messages } from './message.entity';
import { User } from './user.entity';

@Entity('conversations')
export class Conversations extends EntityBasic {
  @IsString()
  @IsNotEmpty()
  @Column()
  userId?: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  chatWithId?: string;

  @IsString()
  @Column({ default: null })
  name?: string;

  @OneToMany(() => Messages, (message) => message.conversation, {
    cascade: ['soft-remove', 'recover'],
  })
  messages?: Messages[];

  @ManyToOne(() => User, (user) => user.conversation)
  user?: User;

  @ManyToOne(() => User, (user) => user.conversationChatWith)
  chatWith?: User;
}
