import { Response, Request } from 'express';
import { CommonException } from '../exceptions/common-error.exception';
import {
  serverError,
  followMsg,
} from '../constants/message-response.constant';
import { FollowService } from '../services/follow.service';
import { requestInfo } from '../constants/constant';
import { httpStatusCode } from '../constants/http-status-code.constant';
import { HandleResponseError } from '../utils/handle-response.util';

export default class FollowController {
  static service = new FollowService();

  static createFollow = async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const userId = req[requestInfo.USER].id;
      const result = await this.service.createFollow(
        res,
        userId,
        body?.userFollowedId
      );
      HandleResponseError(res, result, followMsg.create);
    } catch {
      new CommonException(res, httpStatusCode.SERVER_INTERVEL, serverError);
    }
  };

  static removeFollow = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const userId = req[requestInfo.USER].id;
      await this.service.removeFollow(res, userId, id);
      HandleResponseError(res, true, followMsg.delete);
    } catch {
      new CommonException(res, httpStatusCode.SERVER_INTERVEL, serverError);
    }
  };

  static getListFollow = async (req: Request, res: Response) => {
    try {
      const { query } = req;
      const userId = req[requestInfo.USER].id;
      const results = await this.service.getListFollowOfMe(query, userId);
      HandleResponseError(res, results, followMsg.getAllFollow);
    } catch {
      new CommonException(res, httpStatusCode.SERVER_INTERVEL, serverError);
    }
  };
}
