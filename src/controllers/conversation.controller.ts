import { Request, Response } from 'express';
import { ConversationService } from '../services/conversation.service';
import { CommonException } from 'src/exceptions/exceptions.common-error';
import {
  conversationMsg,
  serverError,
} from 'src/constants/constants.message-response';
import { ResponseController } from 'src/utils/utils.response';

export default class ConversationController {
  static service = new ConversationService();

  static createConversation = async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const userId = req['user'].id;
      const result = await this.service.createConversation(res, body, userId);
      if (!res.headersSent) {
        new ResponseController(res, result, conversationMsg.create);
      }
    } catch (error) {
      new CommonException(res, 500, serverError);
    }
  };

  static getOneConversation = async (req: Request, res: Response) => {
    try {
      const chatWithId = req.params.chatWithId;
      const userId = req['user'].id;
      const result = await this.service.getOneConversation(
        res,
        chatWithId,
        userId
      );
      if (!res.headersSent) {
        new ResponseController(res, result, conversationMsg.getOne);
      }
    } catch (error) {
      new CommonException(res, 500, serverError);
    }
  };
}
