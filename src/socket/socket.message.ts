import { Socket } from 'socket.io';
import SocketInterface from './socket.interface';

class MessageSocket implements SocketInterface {
  handleConnection(socket: Socket) {
    socket.emit('ping', 'socket connection');
  }

  middlewareImplementation(socket: Socket, next) {
    return next();
  }
}

export default MessageSocket;
