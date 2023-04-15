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

  static updateComment = async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const id = req.params.id;
      const userId = req['user'].id;
      await this.service.updateComment(res, id, body, userId);
      if (!res.headersSent) {
        new ResponseController(res, true, commentMsg.update);
      }
    } catch (error) {
      new CommonException(res, 500, serverError);
    }
  };

  static deleteComment = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const userId = req['user'].id;
      await this.service.deleteComment(res, id, userId);
      if (!res.headersSent) {
        new ResponseController(res, true, commentMsg.delete);
      }
    } catch (error) {
      new CommonException(res, 500, serverError);
    }
  };
}
