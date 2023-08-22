import { IcreateConversation } from '../interfaces/conversation.interface';
import { AppDataSource } from '../data-source';
import { Conversations } from '../entities/conversation.entity';
import { Response } from 'express';
import { Equal } from 'typeorm';
import { CommonException } from '../exceptions/exceptions.common-error';
import { conversationMsg } from '../constants/constants.message-response';
import { httpStatusCode } from '../constants/constants.httpStatusCode';

export class ConversationService {
  private converRepository = AppDataSource.getRepository(Conversations);

  async createConversation(
    res: Response,
    body: IcreateConversation,
    userId: string
  ): Promise<Conversations | object> {
    const { chatWithId } = body;
    const checkExisted = await this.converRepository.findOne({
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
    });
    if (checkExisted) {
      return new CommonException(
        res,
        httpStatusCode.CONFLICT,
        conversationMsg.existed
      );
    }
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
  ): Promise<Conversations | object> {
    const result = await this.converRepository.findOne({
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
      relations: {
        user: true,
        chatWith: true,
      },
    });
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
      },
    });
    const results = await conversations.filter(
      (con) => con?.messages?.filter((mes) => !mes?.status).length > 0
    );
    return results;
  }
}
