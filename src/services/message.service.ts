import { AppDataSource } from '../data-source';
import Websocket from '../socket/socket';
import { Messages } from '../entities/message.entity';
import { Conversations } from '../entities/conversation.entity';
import {
  IcreateMessage,
  IqueryMessage,
} from '../interfaces/conversation.interface';
import { Equal } from 'typeorm';

export class MessageService {
  private messRepository = AppDataSource.getRepository(Messages);
  private converRepository = AppDataSource.getRepository(Conversations);

  async createMessage(body: IcreateMessage, userId: string): Promise<void> {
    const { userReviceId } = body;
    const conversation = await this.finConversation(userId, userReviceId);
    const messageDto = {
      ...body,
      conversationId: conversation?.id,
      userSendId: userId,
    };
    if (!conversation) {
      const converDto = {
        userId,
        chatWithId: userReviceId,
        name: 'conversation message',
      };
      const newConversation = await this.converRepository.save(converDto);
      messageDto.conversationId = newConversation?.id;
    }
    const result = await this.messRepository.save(messageDto);
    this.updateSockets(result);
  }

  async getAllMessage(queryDto: IqueryMessage): Promise<Messages[]> {
    const { limit, page, conversationId } = queryDto;
    const query: IqueryMessage = {};
    if (conversationId) {
      query.conversationId = conversationId;
    }
    const results = await this.messRepository.find({
      where: query,
      skip: limit && page ? Number(limit) * (Number(page) - 1) : null,
      take: limit ? Number(limit) : null,
      relations: {
        userSend: true,
        conversation: true,
      },
    });
    return results;
  }

  async getMessageByConversation(
    queryDto: IqueryMessage,
    userId: string
  ): Promise<Messages[]> {
    const { chatWithId } = queryDto;
    const conversation = await this.finConversation(userId, chatWithId);
    if (!conversation) {
      return [];
    }
    const { limit, page } = queryDto;
    const query = { conversationId: Equal(conversation?.id) };
    const results = await this.messRepository.find({
      where: query,
      skip: limit && page ? Number(limit) * (Number(page) - 1) : null,
      take: limit ? Number(limit) : null,
      relations: {
        userSend: true,
        conversation: true,
      },
    });
    return results;
  }

  async finConversation(
    userId: string,
    chatWithId: string
  ): Promise<Conversations> {
    const conversation = await this.converRepository.findOne({
      where: [
        {
          userId: userId,
          chatWithId: chatWithId,
        },
        {
          userId: chatWithId,
          chatWithId: userId,
        },
      ],
    });
    return conversation;
  }

  private updateSockets(message: Messages) {
    const io = Websocket.getInstance();
    io.of('/message').emit('message_new', { data: message });
  }
}
