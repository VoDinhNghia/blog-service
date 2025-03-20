import { CommonException } from '../exceptions/exceptions.common-error';
import { CommentService } from '../services/comment.service';
import { Response, Request } from 'express';
import {
  commentMsg,
  serverError,
} from '../constants/constants.message-response';
import { requestInfo } from '../constants/constant';
import { httpStatusCode } from '../constants/constants.httpStatusCode';
import { HandleResponseError } from '../utils/util.handle-response';

export default class CommentController {
  static service = new CommentService();

  static createComment = async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const userId = req[requestInfo.USER].id;
      const result = await this.service.createComment(res, body, userId);
      HandleResponseError(res, result, commentMsg.create);
    } catch (error) {
      new CommonException(res, httpStatusCode.SERVER_INTERVEL, serverError);
    }
  };

  static updateComment = async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const id = req.params.id;
      const userId = req[requestInfo.USER].id;
      await this.service.updateComment(res, id, body, userId);
      HandleResponseError(res, true, commentMsg.update);
    } catch (error) {
      new CommonException(res, httpStatusCode.SERVER_INTERVEL, serverError);
    }
  };

  static deleteComment = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const userId = req[requestInfo.USER].id;
      await this.service.deleteComment(res, id, userId);
      HandleResponseError(res, true, commentMsg.delete);
    } catch (error) {
      new CommonException(res, httpStatusCode.SERVER_INTERVEL, serverError);
    }
  };
}
