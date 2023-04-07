import { Response, Request } from 'express';
import { CommonException } from '../exceptions/exceptions.common-error';
import { serverError, shareMsg } from '../constants/constants.message-response';
import { ResponseController } from '../utils/utils.response';
import { ShareService } from '../services/share.service';

export default class ShareController {
  static service = new ShareService();

  static createShare = async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const userId = req['user'].id;
      const result = await this.service.createShare(res, body, userId);
      if (!res.headersSent) {
        new ResponseController(res, result, shareMsg.create);
      }
    } catch {
      new CommonException(res, 500, serverError);
    }
  };

  static removeShare = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const userId = req['user'].id;
      await this.service.deleteShare(res, id, userId);
      if (!res.headersSent) {
        new ResponseController(res, id, shareMsg.delete);
      }
    } catch {
      new CommonException(res, 500, serverError);
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
      new CommonException(res, 500, serverError);
    }
  };

  static getAllShareOfUser = (req: Request, res: Response) => {
    try {
      const { query } = req;
      if (!res.headersSent) {
        new ResponseController(res, query, shareMsg.getAllShare);
      }
    } catch {
      new CommonException(res, 500, serverError);
    }
  };

  static updateModeShare = (req: Request, res: Response) => {
    try {
      const { body } = req;
      const id = req.params.is;
      if (!res.headersSent) {
        new ResponseController(res, { body, id }, shareMsg.getAllShare);
      }
    } catch {
      new CommonException(res, 500, serverError);
    }
  };
}
