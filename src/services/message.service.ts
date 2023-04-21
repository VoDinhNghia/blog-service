import Websocket from '../socket/socket';

export class MessageService {
  public createMessage(body) {
    // insert message into table message
    this.updateSockets(body);
  }

  private updateSockets(body) {
    const io = Websocket.getInstance();
    io.of('message').emit('message_new', { data: body });
  }
}
