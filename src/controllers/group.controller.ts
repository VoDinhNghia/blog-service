import { Request, Response } from 'express';
import { groupMsg, serverError } from '../constants/constants.message-response';
import { CommonException } from '../exceptions/exceptions.common-error';
import { ResponseController } from '../utils/utils.response';
import { GroupService } from '../services/group.service';

export default class GroupController {
  static service = new GroupService();

  static createGroup = async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const userId = req['user'].id;
      const result = await this.service.createGroup(body, userId);
      new ResponseController(res, result, groupMsg.create);
    } catch (error) {
      new CommonException(res, 500, serverError);
    }
  };
}
