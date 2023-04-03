import { CommonException } from '../exceptions/exceptions.common-error';
import { AppDataSource } from '../data-source';
import { User } from '../entities/user.entity';
import { userMsg } from '../constants/constants.message-response';
import { Response } from 'express';
import { IcreateUser, Iusers } from '../interfaces/user.interface';

export class UserService {
  async findAllUsers(): Promise<User[]> {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find({
      select: ['id', 'email', 'role'],
    });
    return users;
  }

  async createUser(res: Response, body: IcreateUser): Promise<User> {
    const { email } = body;
    let user: Iusers = new User();
    user = { ...body };
    const userRepository = AppDataSource.getRepository(User);
    const existedEmail = await userRepository.findOneBy({ email });
    if (existedEmail) {
      new CommonException(res, 409, userMsg.existedEmail);
      return;
    }
    const result = await userRepository.save(user);
    return result;
  }

  async findUserById(res: Response, id: string): Promise<User> {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id });
    if (!user) {
      new CommonException(res, 404, userMsg.notFound);
      return;
    }
    return user;
  }
}
