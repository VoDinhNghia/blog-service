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

  static createMessage = async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const userId = req['user'].id;
      await this.service.createMessage(body, userId);
      if (!res.headersSent) {
        new ResponseController(res, true, messageMsg.create);
      }
    } catch (error) {
      new CommonException(res, 500, serverError);
    }
  };
}
