import { CommonException } from '../exceptions/exceptions.common-error';
import { MessageService } from '../services/message.service';
import { Request, Response } from 'express';
import {
  messageMsg,
  serverError,
} from '../constants/constants.message-response';
import { ResponseController } from '../utils/utils.response';

export default class MessageController {
  static service = new MessageService();

  static createMessage = (req: Request, res: Response) => {
    try {
      const userId = req['user'].id;
      this.service.createMessage(userId);
      if (!res.headersSent) {
        new ResponseController(res, true, messageMsg.create);
      }
    } catch {
      new CommonException(res, 500, serverError);
    }
  };
}
