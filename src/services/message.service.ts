import { AppDataSource } from '../data-source';
import Websocket from '../socket/socket';
import { Messages } from '../entities/message.entity';
import { Conversations } from '../entities/conversation.entity';
import { IcreateMessage } from '../interfaces/conversation.interface';

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

  private updateSockets(message: Messages) {
    const io = Websocket.getInstance();
    io.of('/message').emit('message_new', { data: message });
  }
}
