/* eslint-disable @typescript-eslint/no-explicit-any */
import { Socket } from 'socket.io';

interface SocketInterface {
  handleConnection(socket: Socket): void;
  middlewareImplementation?(soccket: Socket, next: any): void;
}

export default SocketInterface;
