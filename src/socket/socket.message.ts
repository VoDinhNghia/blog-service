import { Socket } from 'socket.io';
import SocketInterface from './socket.interface';
import { VerifyTokenSocket } from '../middlewares/verify.jwt';

class MessageSocket implements SocketInterface {
  handleConnection(socket: Socket) {
    socket.emit('ping', 'socket connection');
  }

  middlewareImplementation(socket: Socket, next) {
    const token = socket?.handshake?.headers?.authorization;
    const verifyToken = VerifyTokenSocket(token);
    if (!verifyToken) {
      console.log('UnAuthorized');
      return;
    }
    return next();
  }
}

export default MessageSocket;
