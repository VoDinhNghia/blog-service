import { Request, Response } from 'express';
import { serverError, userMsg } from '../constants/message-response.constant';
import { ResponseController } from '../utils/response.util';
import { CommonException } from '../exceptions/common-error.exception';
import { UserService } from '../services/user.service';
import { requestInfo } from '../constants/constant';
import { httpStatusCode } from '../constants/http-status-code.constant';
import { HandleResponseError } from '../utils/handle-response.util';

export default class UserController {
  static service = new UserService();

  static createNewUser = async (req: Request, res: Response) => {
    try {
      const body = req.body || {};
      const result = await this.service.createNewUser(res, body);
      new ResponseController(res, result, userMsg.create);
    } catch (error) {
      new CommonException(res, httpStatusCode.SERVER_INTERVEL, serverError);
    }
  };

  static getAllUsers = async (req: Request, res: Response) => {
    try {
      const { query } = req;
      const userId = req[requestInfo.USER].id;
      const users = await this.service.findAllUsers(query, userId);
      new ResponseController(res, users, userMsg.getAll);
    } catch (error) {
      new CommonException(res, httpStatusCode.SERVER_INTERVEL, serverError);
    }
  };

  static getUserById = async (req: Request, res: Response) => {
    try {
      const id: string = req.params.id;
      const user = await this.service.findUserById(res, id);
      HandleResponseError(res, user, userMsg.getById);
    } catch (error) {
      new CommonException(res, httpStatusCode.SERVER_INTERVEL, serverError);
    }
  };

  static migrateUser = async (req: Request, res: Response) => {
    try {
      const data = req.body || [];
      const result = await this.service.migrateData(res, data);
      HandleResponseError(res, result, userMsg.syncData.success);
    } catch {
      new CommonException(res, httpStatusCode.SERVER_INTERVEL, serverError);
    }
  };

  // api update avatar, get list user study common major (call BE)
}
