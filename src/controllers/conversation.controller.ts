import { Request, Response } from 'express';
import { ConversationService } from '../services/conversation.service';
import { CommonException } from '../exceptions/common-error.exception';
import {
  conversationMsg,
  serverError,
} from '../constants/message-response.constant';
import { ResponseController } from '../utils/response.util';
import { requestInfo } from '../constants/constant';
import { httpStatusCode } from '../constants/http-status-code.constant';

export default class ConversationController {
  static service = new ConversationService();

  static createConversation = async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const userId = req[requestInfo.USER].id;
      const checkExistedConver = await this.service.findOneConver(
        userId,
        body?.chatWithId,
        false
      );
      if (checkExistedConver) {
        return new CommonException(
          res,
          httpStatusCode.CONFLICT,
          conversationMsg.existed
        );
      }
      const result = await this.service.createConversation(body, userId);
      return new ResponseController(res, result, conversationMsg.create);
    } catch (error) {
      new CommonException(res, httpStatusCode.SERVER_INTERVEL, serverError);
    }
  };

  static getOneConversation = async (req: Request, res: Response) => {
    try {
      const chatWithId = req.params.chatWithId;
      const userId = req[requestInfo.USER].id;
      const result = await this.service.getOneConversation(chatWithId, userId);
      return new ResponseController(res, result, conversationMsg.getOne);
    } catch (error) {
      new CommonException(res, httpStatusCode.SERVER_INTERVEL, serverError);
    }
  };

  static findAllConversationByUser = async (req: Request, res: Response) => {
    try {
      const userId = req[requestInfo.USER].id;
      const results = await this.service.findAllConversationByUser(userId);
      new ResponseController(
        res,
        results,
        conversationMsg.getConversationByUser
      );
    } catch (error) {
      new CommonException(res, httpStatusCode.SERVER_INTERVEL, serverError);
    }
  };
}
