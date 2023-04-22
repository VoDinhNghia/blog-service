import { Column, Entity, ManyToOne } from 'typeorm';
import { EntityBasic } from './base.entity';
import { Conversations } from './conversation.entity';
import { IsBoolean, IsString } from 'class-validator';
import { User } from './user.entity';

@Entity('messages')
export class Messages extends EntityBasic {
  @IsString()
  @Column()
  conversationId?: string;

  @IsString()
  @Column()
  content?: string;

  @IsString()
  @Column()
  userSendId?: string;

  @IsBoolean()
  @Column({ default: false })
  status?: boolean;

  @ManyToOne(() => Conversations, (conv) => conv.messages)
  conversation?: Conversations;

  @ManyToOne(() => User, (user) => user.userSendMessage)
  userSend?: User;
}
