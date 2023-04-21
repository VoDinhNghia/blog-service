import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { EntityBasic } from './base.entity';
import { Conversations } from './conversation.entity';
import { IsNotEmpty, IsString } from 'class-validator';
import { User } from './user.entity';

@Entity('messages')
export class Messages extends EntityBasic {
  @IsString()
  @IsNotEmpty()
  @Column()
  conversationId?: string;

  @IsString()
  @Column()
  content?: string;

  @IsString()
  @Column()
  userSendId?: string;

  @IsString()
  @Column()
  userReviceId?: string;

  @OneToMany(() => Conversations, (conv) => conv.messages)
  conversation?: Conversations;

  @ManyToOne(() => User, (user) => user.userSendMessage)
  userSend?: User;

  @ManyToOne(() => User, (user) => user.userReciveMessage)
  userRevice?: User;
}
