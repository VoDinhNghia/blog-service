import { CommonException } from '../exceptions/exceptions.common-error';
import { CommentService } from '../services/comment.service';
import { Response, Request } from 'express';
import {
  commentMsg,
  serverError,
} from '../constants/constants.message-response';
import { ResponseController } from '../utils/utils.response';

export default class CommentController {
  static service = new CommentService();

  static createComment = async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const userId = req['user'].id;
      const result = await this.service.createComment(res, body, userId);
      if (!res.headersSent) {
        new ResponseController(res, result, commentMsg.create);
      }
    } catch (error) {
      new CommonException(res, 500, serverError);
    }
  };
}
