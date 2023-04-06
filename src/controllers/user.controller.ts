import { Request, Response } from 'express';
import { serverError, userMsg } from '../constants/constants.message-response';
import { ResponseController } from '../utils/utils.response';
import { CommonException } from '../exceptions/exceptions.common-error';
import { UserService } from '../services/user.service';

export default class UserController {
  static service = new UserService();

  static getAllUsers = async (req: Request, res: Response) => {
    try {
      const { query } = req;
      const users = await this.service.findAllUsers(query);
      new ResponseController(res, users, userMsg.getAll);
    } catch (error) {
      new CommonException(res, 500, serverError);
    }
  };

  static getUserById = async (req: Request, res: Response) => {
    try {
      const id: string = req.params.id;
      const user = await this.service.findUserById(res, id);
      if (!res.headersSent) {
        new ResponseController(res, user, userMsg.getById);
      }
    } catch (error) {
      new CommonException(res, 500, serverError);
    }
  };

  static migrateUser = async (req: Request, res: Response) => {
    try {
      const data = req.body || [];
      const result = await this.service.migrateData(res, data);
      if (!res.headersSent) {
        new ResponseController(res, result, userMsg.syncData.success);
      }
    } catch {
      new CommonException(res, 500, serverError);
    }
  };
}
