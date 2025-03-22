import { Request, Response } from 'express';
import { groupMsg, serverError } from '../constants/message-response.constant';
import { CommonException } from '../exceptions/common-error.exception';
import { ResponseController } from '../utils/response.util';
import { GroupService } from '../services/group.service';
import { requestInfo } from '../constants/constant';
import { httpStatusCode } from '../constants/http-status-code.constant';
import { HandleResponseError } from '../utils/handle-response.util';

export default class GroupController {
  static service = new GroupService();

  static createGroup = async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const userId = req[requestInfo.USER].id;
      const result = await this.service.createGroup(body, userId);
      new ResponseController(res, result, groupMsg.create);
    } catch {
      new CommonException(res, httpStatusCode.SERVER_INTERVEL, serverError);
    }
  };

  static updateGroup = async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const groupId = req.params.id;
      const userId = req[requestInfo.USER].id;
      const result = await this.service.updateGroup(res, groupId, body, userId);
      HandleResponseError(res, result, groupMsg.update);
    } catch {
      new CommonException(res, httpStatusCode.SERVER_INTERVEL, serverError);
    }
  };

  static addAndUpdateMembers = async (req: Request, res: Response) => {
    try {
      const { members = [] } = req.body;
      const groupId = req.params.groupId;
      await this.service.addAndUpdateNewMembers(groupId, members);
      HandleResponseError(res, true, groupMsg.addMembers);
    } catch {
      new CommonException(res, httpStatusCode.SERVER_INTERVEL, serverError);
    }
  };

  static deleteGroup = async (req: Request, res: Response) => {
    try {
      const groupId = req.params.id;
      const userId = req[requestInfo.USER].id;
      await this.service.deleteGroup(res, groupId, userId);
      HandleResponseError(res, true, groupMsg.delete);
    } catch {
      new CommonException(res, httpStatusCode.SERVER_INTERVEL, serverError);
    }
  };

  static getGroupById = async (req: Request, res: Response) => {
    try {
      const groupId = req.params.id;
      const result = await this.service.findGoupById(res, groupId);
      HandleResponseError(res, result, groupMsg.getById);
    } catch {
      new CommonException(res, httpStatusCode.SERVER_INTERVEL, serverError);
    }
  };

  static getAllGroups = async (req: Request, res: Response) => {
    try {
      const { query } = req;
      const userId = req[requestInfo.USER].id;
      const results = await this.service.findAllGroups(query, userId);
      new ResponseController(res, results, groupMsg.getAll);
    } catch {
      new CommonException(res, httpStatusCode.SERVER_INTERVEL, serverError);
    }
  };

  static deleteMember = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const userId = req[requestInfo.USER].id;
      await this.service.deleteMember(res, id, userId);
      HandleResponseError(res, true, groupMsg.deleteMember);
    } catch {
      new CommonException(res, httpStatusCode.SERVER_INTERVEL, serverError);
    }
  };

  static memberLeavegroup = async (req: Request, res: Response) => {
    try {
      const groupId = req.params.groupId;
      const userId = req[requestInfo.USER].id;
      await this.service.memberLeaveGroup(res, groupId, userId);
      HandleResponseError(res, true, groupMsg.leaveGroup);
    } catch {
      new CommonException(res, httpStatusCode.SERVER_INTERVEL, serverError);
    }
  };
}
