import { Request, Response } from 'express';
import { serverError, userMsg } from '../constants/constants.message-response';
import { ResponseController } from '../utils/utils.response';
import { CommonException } from '../exceptions/exceptions.common-error';
import { UserService } from '../services/user.service';

class UserController {
  static service = new UserService();

  static listAll = async (req: Request, res: Response) => {
    try {
      const users = await this.service.findAllUsers();
      new ResponseController(res, users, userMsg.getAll);
    } catch (error) {
      new CommonException(res, 500, serverError);
    }
  };

  static getUserById = async (req: Request, res: Response) => {
    try {
      const id: string = req.params.id;
      const user = await this.service.findUserById(res, id);
      new ResponseController(res, user, userMsg.getById);
    } catch (error) {
      new CommonException(res, 500, serverError);
    }
  };

  static createUser = async (req: Request, res: Response) => {
    try {
      const result = await this.service.createUser(res, req.body);
      new ResponseController(res, result, userMsg.create);
    } catch (error) {
      new CommonException(res, 500, serverError);
    }
  };
}

export default UserController;
