import { Response, Request } from 'express';
import { CommonException } from '../exceptions/exceptions.common-error';
import { serverError, shareMsg } from '../constants/constants.message-response';
import { ResponseController } from '../utils/utils.response';
import { ShareService } from '../services/share.service';
import { requestInfo } from '../constants/constant';
import { httpStatusCode } from '../constants/constants.httpStatusCode';

export default class ShareController {
  static service = new ShareService();

  static createShare = async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const userId = req[requestInfo.USER].id;
      const result = await this.service.createShare(res, body, userId);
      if (!res.headersSent) {
        new ResponseController(res, result, shareMsg.create);
      }
    } catch {
      new CommonException(res, httpStatusCode.SERVER_INTERVEL, serverError);
    }
  };

  static removeShare = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const userId = req[requestInfo.USER].id;
      await this.service.deleteShare(res, id, userId);
      if (!res.headersSent) {
        new ResponseController(res, id, shareMsg.delete);
      }
    } catch {
      new CommonException(res, httpStatusCode.SERVER_INTERVEL, serverError);
    }
  };

  static getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const result = await this.service.findShareById(res, id);
      if (!res.headersSent) {
        new ResponseController(res, result, shareMsg.getById);
      }
    } catch {
      new CommonException(res, httpStatusCode.SERVER_INTERVEL, serverError);
    }
  };

  static getAllShareOfUser = async (req: Request, res: Response) => {
    try {
      const { query } = req;
      const userId = req[requestInfo.USER].id;
      const results = await this.service.findAllShare(query, userId);
      if (!res.headersSent) {
        new ResponseController(res, results, shareMsg.getAllShare);
      }
    } catch {
      new CommonException(res, httpStatusCode.SERVER_INTERVEL, serverError);
    }
  };

  static updateModeShare = async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const id = req.params.id;
      const userId = req[requestInfo.USER].id;
      const result = await this.service.updateMode(res, id, body, userId);
      if (!res.headersSent) {
        new ResponseController(res, result, shareMsg.getAllShare);
      }
    } catch (error) {
      new CommonException(res, httpStatusCode.SERVER_INTERVEL, serverError);
    }
  };
}
