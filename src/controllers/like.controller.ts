import { Response, Request } from 'express';
import { CommonException } from '../exceptions/exceptions.common-error';
import { likeMsg, serverError } from '../constants/constants.message-response';
import { ResponseController } from '../utils/utils.response';
import { LikeService } from '../services/like.service';

export default class LikeController {
  static service = new LikeService();

  static createLike(req: Request, res: Response) {
    try {
      const { body } = req;
      new ResponseController(res, body, likeMsg.create);
    } catch {
      new CommonException(res, 500, serverError);
    }
  }

  static removeLike(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!res.headersSent) {
        new ResponseController(res, id, likeMsg.delete);
      }
    } catch {
      new CommonException(res, 500, serverError);
    }
  }
}
