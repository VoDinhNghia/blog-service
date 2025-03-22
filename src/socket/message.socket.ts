import { Socket } from 'socket.io';
import SocketInterface from './interface.socket';
// import { VerifyTokenSocket } from '../middlewares/verify.jwt';

class MessageSocket implements SocketInterface {
  handleConnection(socket: Socket) {
    socket.emit('ping', 'socket connection');
  }

  middlewareImplementation(socket: Socket, next) {
    // const token = socket?.handshake?.headers?.authorization;
    // const verifyToken = VerifyTokenSocket(token);
    // if (!verifyToken) {
    //   return;
    // }
    return next();
  }
}

export default MessageSocket;
