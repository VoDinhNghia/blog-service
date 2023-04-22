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

  static getAllMessage = async (req: Request, res: Response) => {
    try {
      const { query } = req;
      const results = await this.service.getAllMessage(query);
      if (!res.headersSent) {
        new ResponseController(res, results, messageMsg.getAll);
      }
    } catch (error) {
      new CommonException(res, 500, serverError);
    }
  };

  static getAllMessageByConver = async (req: Request, res: Response) => {
    try {
      const { query } = req;
      const userId = req['user'].id;
      const results = await this.service.getMessageByConversation(
        query,
        userId
      );
      if (!res.headersSent) {
        new ResponseController(res, results, messageMsg.getAll);
      }
    } catch (error) {
      new CommonException(res, 500, serverError);
    }
  };
}
