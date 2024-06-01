import { CommonException } from '../exceptions/exceptions.common-error';
import { AppDataSource } from '../data-source';
import { User } from '../entities/user.entity';
import { userMsg } from '../constants/constants.message-response';
import { Response } from 'express';
import {
  IcreateUser,
  IqueryUser,
  IuserMigrate,
} from '../interfaces/user.interface';
import { selectUser } from '../utils/utils.select-fields';
import { IqueryPagination } from '../interfaces/pagination.interface';
import { Equal, In, Like, Not } from 'typeorm';
import { httpStatusCode } from '../constants/constants.httpStatusCode';
import { generateCode, randomUuid } from '../utils/util';
export class UserService {
  private selectOption: string[] | unknown = selectUser;
  private userRepository = AppDataSource.getRepository(User);

  async findAllUsers(
    queryDto: IqueryPagination,
    userId: string
  ): Promise<{ results: User[]; total: number }> {
    const { limit, page, searchKey } = queryDto;
    const query: IqueryUser = { id: Not(In([userId])) };
    let searchQuery = null;
    if (searchKey) {
      searchQuery = [
        {
          ...query,
          firstName: Like(`%${searchKey}%`),
        },
        {
          ...query,
          lastName: Like(`%${searchKey}%`),
        },
        {
          ...query,
          middleName: Like(`%${searchKey}%`),
        },
      ];
    }
    const results = await this.userRepository.find({
      where: searchQuery ? searchQuery : query,
      skip: limit && page ? Number(limit) * (Number(page) - 1) : null,
      take: limit ? Number(limit) : null,
      order: {
        createdAt: 'DESC',
      },
      select: this.selectOption,
    });
    const total = await this.userRepository.findAndCount({
      where: query,
    });
    return { results, total: total[1] ?? 0 };
  }

  async migrateData(res: Response, data = []): Promise<User[] | object> {
    const checkDataInTable = await this.userRepository.find();
    if (checkDataInTable.length > 0) {
      return new CommonException(
        res,
        httpStatusCode.FORBIDEN,
        userMsg.syncData.notPermission
      );
    }
    const userDto = data.map((user: IuserMigrate) => {
      const dto = {
        ...user?.profile,
        ...user,
        userId: user?._id,
        profileId: user?.profile?._id,
        password: user?.passWord,
      };
      return dto;
    });
    const results = await this.userRepository.save(userDto);
    return results;
  }

  async findUserById(res: Response, id: string): Promise<User | object> {
    const user = await this.userRepository.findOne({
      where: { id: Equal(id) },
      select: this.selectOption,
    });
    if (!user) {
      return new CommonException(
        res,
        httpStatusCode.NOT_FOUND,
        userMsg.notFound
      );
    }
    return user;
  }

  async createNewUser(
    res: Response,
    userDto: IcreateUser
  ): Promise<User | object> {
    const isEmailExisted = await this.checkEmailExisted(userDto?.email);
    if (isEmailExisted) {
      return new CommonException(
        res,
        httpStatusCode.CONFLICT,
        userMsg.existedEmail
      );
    }
    const dto = {
      ...userDto,
      userId: randomUuid(),
      profileId: randomUuid(),
      code: generateCode(4),
    };
    const result = await this.userRepository.save(dto);
    return result;
  }

  async checkEmailExisted(email: string): Promise<boolean> {
    const result = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    return result ? true : false;
  }
}
