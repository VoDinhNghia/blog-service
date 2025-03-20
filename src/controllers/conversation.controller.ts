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
import { HandleResponseError } from '../utils/util.handle-response';

export default class ConversationController {
  static service = new ConversationService();

  static createConversation = async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const userId = req[requestInfo.USER].id;
      const result = await this.service.createConversation(res, body, userId);
      HandleResponseError(res, result, conversationMsg.create);
    } catch (error) {
      new CommonException(res, httpStatusCode.SERVER_INTERVEL, serverError);
    }
  };

  static getOneConversation = async (req: Request, res: Response) => {
    try {
      const chatWithId = req.params.chatWithId;
      const userId = req[requestInfo.USER].id;
      const result = await this.service.getOneConversation(chatWithId, userId);
      HandleResponseError(res, result, conversationMsg.getOne);
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
