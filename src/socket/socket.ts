/* eslint-disable @typescript-eslint/no-explicit-any */
import { Server, Socket } from 'socket.io';

const WEBSOCKET_CORS = {
  origin: 'http://localhost:8005',
  methods: ['GET', 'POST'],
};

class Websocket extends Server {
  private static io: Websocket;

  constructor(httpServer) {
    super(httpServer, {
      cors: WEBSOCKET_CORS,
    });
  }

  public static getInstance(httpServer?): Websocket {
    if (!Websocket.io) {
      Websocket.io = new Websocket(httpServer);
    }
    return Websocket.io;
  }

  public initializeHandlers(socketHandlers: Array<any>) {
    socketHandlers.forEach((element) => {
      const namespace = Websocket.io.of(element.path, (socket: Socket) => {
        element.handler.handleConnection(socket);
      });

      if (element.handler.middlewareImplementation) {
        namespace.use(element.handler.middlewareImplementation);
      }
    });
  }
}

export default Websocket;
