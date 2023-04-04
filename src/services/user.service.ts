import { CommonException } from '../exceptions/exceptions.common-error';
import { AppDataSource } from '../data-source';
import { User } from '../entities/user.entity';
import { userMsg } from '../constants/constants.message-response';
import { Response } from 'express';
import { IuserMigrate } from '../interfaces/user.interface';
import { selectUser } from '../utils/utils.select-fields';
export class UserService {
  private selectOption: unknown = selectUser;
  private userRepository = AppDataSource.getRepository(User);

  async findAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find({
      select: this.selectOption,
    });
    return users;
  }

  async migrateData(res: Response, data = []): Promise<User[] | object> {
    const checkDataInTable = await this.userRepository.find();
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
    const results = await this.userRepository.save(userDto);
    return results;
  }

  async findUserById(res: Response, id: string): Promise<User | object> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: this.selectOption,
    });
    if (!user) {
      return new CommonException(res, 404, userMsg.notFound);
    }
    return user;
  }
}
