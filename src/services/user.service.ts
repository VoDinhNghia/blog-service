import { CommonException } from '../exceptions/exceptions.common-error';
import { AppDataSource } from '../data-source';
import { User } from '../entities/user.entity';
import { userMsg } from '../constants/constants.message-response';
import { Response } from 'express';
import { IcreateUser, IuserMigrate } from '../interfaces/user.interface';
export class UserService {
  async findAllUsers(): Promise<User[]> {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find({
      select: ['id', 'email', 'role'],
    });
    return users;
  }

  async createUser(res: Response, body: IcreateUser): Promise<User | object> {
    const { email, password, role } = body;
    const user = new User();
    user.email = email;
    user.password = password;
    user.role = role;
    const userRepository = AppDataSource.getRepository(User);
    const existedEmail = await userRepository.findOneBy({ email });
    if (existedEmail) {
      return new CommonException(res, 409, userMsg.existedEmail);
    }
    user.hashPassword();
    const result = await userRepository.save(user);
    return result;
  }

  async migrateData(res: Response, data = []): Promise<User[] | object> {
    const userRepository = AppDataSource.getRepository(User);
    const checkDataInTable = await userRepository.find();
    if (checkDataInTable.length > 0) {
      return new CommonException(res, 403, userMsg.syncData.notPermission);
    }
    const userDto = data.map((user: IuserMigrate) => {
      const dto = {
        email: user?.email,
        firstName: user?.profile?.firstName,
        lastName: user?.profile?.lastName,
        middleName: user?.profile?.middleName,
        userId: user?._id,
        code: user?.profile?.code,
        profileId: user?.profile?._id,
        password: user?.passWord,
        isDeleted: user?.isDeleted,
        avatar: user?.profile?.avatar,
        status: user?.status,
        role: user?.role,
        mobile: user?.profile?.mobile,
      };
      return dto;
    });
    const results = await userRepository.save(userDto);
    return results;
  }

  async findUserById(res: Response, id: string): Promise<User | object> {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id });
    if (!user) {
      return new CommonException(res, 404, userMsg.notFound);
    }
    return user;
  }
}
