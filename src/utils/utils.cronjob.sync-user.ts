import * as dotenv from 'dotenv';
import { keyAccessBackend } from '../constants/constant';
import { Http } from './utils.http-request';
import { IuserMigrate } from '../interfaces/user.interface';
import { AppDataSource } from '../data-source';
import { User } from '../entities/user.entity';
dotenv.config();

export class CronJobService {
  async syncUserFromBackend() {
    const userRepository = AppDataSource.getRepository(User);
    const url = `${process.env.MGT_STUDENT}/api/sync-service/users`;
    const users: IuserMigrate[] = await new Http().get(url, keyAccessBackend);
    if (!users) {
      console.log('Call BE failed!');
      return null;
    }
    try {
      const userDto = [];
      for await (const user of users) {
        const dto = {
          email: user?.email,
          firstName: user?.profile?.firstName,
          lastName: user?.profile?.lastName,
          middleName: user?.profile?.middleName,
          userId: user?._id,
          isDeleted: user?.isDeleted,
          code: user?.profile?.code,
          profileId: user?.profile?._id,
          password: user?.passWord,
          avatar: user?.profile?.avatar,
          status: user?.status,
          role: user?.role,
          mobile: user?.profile?.mobile,
        };
        const checkUser = await userRepository.findOneBy({
          userId: user?._id,
        });
        if (checkUser) {
          dto.avatar = checkUser.avatar;
          await userRepository.update(checkUser.id, {
            ...dto,
            updatedAt: new Date(),
          });
        } else {
          userDto.push(dto);
        }
      }
      await userRepository.save(userDto);
      console.log('Sync data success!');
    } catch (error) {
      console.log(error);
      console.log('Sync data failed!');
    }
  }
}
