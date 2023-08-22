import { CommonException } from '../exceptions/exceptions.common-error';
import { MessageService } from '../services/message.service';
import { Request, Response } from 'express';
import {
  messageMsg,
  serverError,
} from '../constants/constants.message-response';
import { ResponseController } from '../utils/utils.response';
import { requestInfo } from '../constants/constant';
import { httpStatusCode } from '../constants/constants.httpStatusCode';

export default class MessageController {
  static service = new MessageService();

  static createMessage = async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const userId = req[requestInfo.USER].id;
      await this.service.createMessage(body, userId);
      if (!res.headersSent) {
        new ResponseController(res, true, messageMsg.create);
      }
    } catch (error) {
      new CommonException(res, httpStatusCode.SERVER_INTERVEL, serverError);
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
      new CommonException(res, httpStatusCode.SERVER_INTERVEL, serverError);
    }
  };

  static getAllMessageByConver = async (req: Request, res: Response) => {
    try {
      const { query } = req;
      const userId = req[requestInfo.USER].id;
      const results = await this.service.getMessageByConversation(
        query,
        userId
      );
      if (!res.headersSent) {
        new ResponseController(res, results, messageMsg.getAll);
      }
    } catch (error) {
      new CommonException(res, httpStatusCode.SERVER_INTERVEL, serverError);
    }
  };

  static updateStatusMessage = async (req: Request, res: Response) => {
    try {
      const conversationId = req.params.id;
      const userId = req[requestInfo.USER].id;
      const result = await this.service.updateStatusMessage(
        conversationId,
        userId
      );
      new ResponseController(res, result, messageMsg.update);
    } catch (error) {
      new CommonException(res, httpStatusCode.SERVER_INTERVEL, serverError);
    }
  };
}
