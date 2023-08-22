import { Request, Response } from 'express';
import { ConversationService } from '../services/conversation.service';
import { CommonException } from '../exceptions/exceptions.common-error';
import {
  conversationMsg,
  serverError,
} from '../constants/constants.message-response';
import { ResponseController } from '../utils/utils.response';
import { requestInfo } from '../constants/constant';
import { httpStatusCode } from '../constants/constants.httpStatusCode';

export default class ConversationController {
  static service = new ConversationService();

  static createConversation = async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const userId = req[requestInfo.USER].id;
      const result = await this.service.createConversation(res, body, userId);
      if (!res.headersSent) {
        new ResponseController(res, result, conversationMsg.create);
      }
    } catch (error) {
      new CommonException(res, httpStatusCode.SERVER_INTERVEL, serverError);
    }
  };

  static getOneConversation = async (req: Request, res: Response) => {
    try {
      const chatWithId = req.params.chatWithId;
      const userId = req[requestInfo.USER].id;
      const result = await this.service.getOneConversation(chatWithId, userId);
      if (!res.headersSent) {
        new ResponseController(res, result, conversationMsg.getOne);
      }
    } catch (error) {
      new CommonException(res, httpStatusCode.SERVER_INTERVEL, serverError);
    }
  };
}
