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
    } catch {
      new CommonException(res, 500, serverError);
    }
  };

  static updateGroup = async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const groupId = req.params.id;
      const userId = req['user'].id;
      const result = await this.service.updateGroup(res, groupId, body, userId);
      if (!res.headersSent) {
        new ResponseController(res, result, groupMsg.update);
      }
    } catch {
      new CommonException(res, 500, serverError);
    }
  };

  static addAndUpdateMembers = async (req: Request, res: Response) => {
    try {
      const { members = [] } = req.body;
      const groupId = req.params.groupId;
      await this.service.addAndUpdateNewMembers(groupId, members);
      if (!res.headersSent) {
        new ResponseController(res, true, groupMsg.addMembers);
      }
    } catch {
      new CommonException(res, 500, serverError);
    }
  };

  static deleteGroup = async (req: Request, res: Response) => {
    try {
      const groupId = req.params.id;
      const userId = req['user'].id;
      await this.service.deleteGroup(res, groupId, userId);
      if (!res.headersSent) {
        new ResponseController(res, true, groupMsg.delete);
      }
    } catch {
      new CommonException(res, 500, serverError);
    }
  };

  static getGroupById = async (req: Request, res: Response) => {
    try {
      const groupId = req.params.id;
      const result = await this.service.findGoupById(res, groupId);
      if (!res.headersSent) {
        new ResponseController(res, result, groupMsg.getById);
      }
    } catch {
      new CommonException(res, 500, serverError);
    }
  };

  static getAllGroupOfMe = async (req: Request, res: Response) => {
    try {
      const { query } = req;
      const userId = req['user'].id;
      const results = await this.service.findAllGroupOfMe(query, userId);
      new ResponseController(res, results, groupMsg.getAll);
    } catch {
      new CommonException(res, 500, serverError);
    }
  };
}
