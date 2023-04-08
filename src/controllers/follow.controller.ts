import { Response, Request } from 'express';
import { CommonException } from '../exceptions/exceptions.common-error';
import {
  serverError,
  followMsg,
} from '../constants/constants.message-response';
import { ResponseController } from '../utils/utils.response';
import { FollowService } from '../services/follow.service';

export default class FollowController {
  static service = new FollowService();

  static createFollow = async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const userId = req['user'].id;
      const result = await this.service.createFollow(
        userId,
        body?.userFollowedId
      );
      if (!res.headersSent) {
        new ResponseController(res, result, followMsg.create);
      }
    } catch {
      new CommonException(res, 500, serverError);
    }
  };
}
