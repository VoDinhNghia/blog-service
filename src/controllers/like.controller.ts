import { Response, Request } from 'express';
import { CommonException } from '../exceptions/common-error.exception';
import { likeMsg, serverError } from '../constants/message-response.constant';
import { LikeService } from '../services/like.service';
import { requestInfo } from '../constants/constant';
import { httpStatusCode } from '../constants/http-status-code.constant';
import { HandleResponseError } from '../utils/handle-response.util';

export default class LikeController {
  static service = new LikeService();

  static createLike = async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const userId = req[requestInfo.USER].id;
      const result = await this.service.createLike(res, body, userId);
      HandleResponseError(res, result, likeMsg.create);
    } catch {
      new CommonException(res, httpStatusCode.SERVER_INTERVEL, serverError);
    }
  };
}
