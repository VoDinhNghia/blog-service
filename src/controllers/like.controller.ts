import { Response, Request } from 'express';
import { CommonException } from '../exceptions/exceptions.common-error';
import { likeMsg, serverError } from '../constants/constants.message-response';
import { ResponseController } from '../utils/utils.response';
import { LikeService } from '../services/like.service';

export default class LikeController {
  static service = new LikeService();

  static createLike = async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const userId = req['user'].id;
      const result = await this.service.createLike(res, body, userId);
      if (!res.headersSent) {
        new ResponseController(res, result, likeMsg.create);
      }
    } catch {
      new CommonException(res, 500, serverError);
    }
  };
}
