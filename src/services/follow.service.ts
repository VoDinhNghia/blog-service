import { IqueryFollow } from '../interfaces/follow.interface';
import { followMsg } from '../constants/constants.message-response';
import { AppDataSource } from '../data-source';
import { Follows } from '../entities/follow.entity';
import { EqueryFollowType } from '../constants/constant';
import { followRelations } from '../utils/utils.relation-field';
import { CommonException } from '../exceptions/exceptions.common-error';
import { Response } from 'express';
import { Equal } from 'typeorm';
import { httpStatusCode } from '../constants/constants.httpStatusCode';

export class FollowService {
  private followRepository = AppDataSource.getRepository(Follows);

  async createFollow(
    res: Response,
    userId: string,
    followedId: string
  ): Promise<Follows | object> {
    const followDto = {
      userFollowId: userId,
      userFollowedId: followedId,
    };
    const follow = await this.followRepository.findOne({
      where: followDto,
    });
    if (follow) {
      return new CommonException(
        res,
        httpStatusCode.CONFLICT,
        followMsg.existed
      );
    }
    const result = await this.followRepository.save(followDto);
    return result;
  }

  async removeFollow(
    res: Response,
    userId: string,
    id: string
  ): Promise<Follows | object> {
    const follow = await this.followRepository.findOne({
      where: {
        id: Equal(id),
      },
    });
    if (!follow) {
      return new CommonException(
        res,
        httpStatusCode.NOT_FOUND,
        followMsg.notFound
      );
    }
    if (String(follow?.userFollowId) !== String(userId)) {
      return new CommonException(
        res,
        httpStatusCode.FORBIDEN,
        followMsg.notPermission
      );
    }
    await this.followRepository.delete(id);
  }

  async getListFollowOfMe(
    queryDto: IqueryFollow,
    userId: string
  ): Promise<{ results: Follows[]; total: number }> {
    const { limit, page, type } = queryDto;
    const query: IqueryFollow = {};
    if (type === EqueryFollowType.FOLLOWING) {
      query.userFollowId = userId;
    } else {
      query.userFollowedId = userId;
    }
    const results = await this.followRepository.find({
      where: query,
      skip: limit && page ? Number(limit) * (Number(page) - 1) : null,
      take: limit ? Number(limit) : null,
      relations: followRelations,
      order: {
        createdAt: 'DESC',
      },
    });
    const total = await this.followRepository.findAndCount({
      where: query,
    });
    return { results, total: total[1] ?? 0 };
  }
}
