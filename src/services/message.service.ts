import { AppDataSource } from '../data-source';
import Websocket from '../socket/socket';
import { Messages } from '../entities/message.entity';
import { Conversations } from '../entities/conversation.entity';
import {
  IcreateMessage,
  IqueryMessage,
} from '../interfaces/conversation.interface';

export class MessageService {
  private messRepository = AppDataSource.getRepository(Messages);
  private converRepository = AppDataSource.getRepository(Conversations);

  async createMessage(body: IcreateMessage, userId: string): Promise<void> {
    const messageDto = {
      ...body,
      userSendId: userId,
    };
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

  private updateSockets(message: Messages) {
    const io = Websocket.getInstance();
    io.of('/message').emit('message_new', { data: message });
  }
}
