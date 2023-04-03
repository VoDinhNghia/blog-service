import { Request, Response } from 'express';
import { validate } from 'class-validator';

import { User } from '../entities/user.entity';
import { AppDataSource } from '../data-source';
import { serverError, userMsg } from '../constants/constants.message-response';
import { ResponseController } from '../utils/utils.response';
import { CommonException } from '../exceptions/exceptions.common-error';

class UserController {
  static listAll = async (req: Request, res: Response) => {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find({
      select: ['id', 'email', 'role'],
    });
    new ResponseController(res, users, userMsg.getAll);
  };

  static getUserById = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const userRepository = AppDataSource.getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneBy({ id });
    } catch (error) {
      new CommonException(res, 404, userMsg.notFound);
    }
    new ResponseController(res, user, userMsg.getById);
  };

  static createUser = async (req: Request, res: Response) => {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const { email } = req.body;
      let user = new User();
      user = { ...req.body };
      const errors = await validate(user);
      if (errors.length > 0) {
        new CommonException(res, 400, errors);
      }
      const existedEmail = await userRepository.findOneBy({ email });
      if (!existedEmail) {
        new CommonException(res, 409, userMsg.existedEmail);
      }
      user.hashPassword();
      const result = await userRepository.save(user);
      new ResponseController(res, result, userMsg.create);
    } catch (error) {
      new CommonException(res, 500, serverError);
    }
  };
}

export default UserController;
