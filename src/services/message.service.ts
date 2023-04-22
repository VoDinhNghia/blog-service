import Websocket from '../socket/socket';

export class MessageService {
  public createMessage(userId: string) {
    this.updateSockets({ content: 'testst', userId });
  }

  private updateSockets(body) {
    const io = Websocket.getInstance();
    io.of('/message').emit('message_new', { data: body });
  }
}
