import { IcreateConversation } from '../interfaces/conversation.interface';
import { AppDataSource } from '../data-source';
import { Conversations } from '../entities/conversation.entity';
import { Equal } from 'typeorm';

export class ConversationService {
  private converRepository = AppDataSource.getRepository(Conversations);

  async createConversation(
    body: IcreateConversation,
    userId: string
  ): Promise<Conversations> {
    const conversationDto = {
      ...body,
      userId,
    };
    const result = await this.converRepository.save(conversationDto);
    return result;
  }

  async getOneConversation(
    chatWithId: string,
    userId: string
  ): Promise<Conversations> {
    const result = await this.findOneConver(userId, chatWithId, true);
    return result;
  }

  async findAllConversationByUser(userId: string): Promise<Conversations[]> {
    const conversations = await this.converRepository.find({
      where: [
        {
          userId: Equal(userId),
        },
        {
          chatWithId: Equal(userId),
        },
      ],
      relations: {
        messages: true,
        user: true,
        chatWith: true,
      },
    });
    const results = await conversations.filter(
      (con) => con?.messages?.filter((mes) => !mes?.status).length > 0
    );
    return results;
  }

  async findOneConver(
    userId: string,
    chatWithId: string,
    isRelation: boolean
  ): Promise<Conversations> {
    const result = await this.converRepository.findOne({
      where: [
        {
          userId: Equal(userId),
          chatWithId: Equal(chatWithId),
        },
        {
          userId: Equal(chatWithId),
          chatWithId: Equal(userId),
        },
      ],
      relations: isRelation
        ? {
            user: true,
            chatWith: true,
          }
        : null,
    });
    return result;
  }
}
