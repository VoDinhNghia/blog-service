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
      const result = await this.service.createShare(res, body);
      if (!res.headersSent) {
        new ResponseController(res, result, shareMsg.create);
      }
    } catch {
      new CommonException(res, 500, serverError);
    }
  };

  static removeShare = (req: Request, res: Response) => {
    try {
      const { id } = req.params;
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
    } catch (error) {
      console.log(error);
      new CommonException(res, 500, serverError);
    }
  };
}
