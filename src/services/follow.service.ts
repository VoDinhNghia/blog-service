import { IqueryFollow } from 'src/interfaces/follow.interface';
import { followMsg } from '../constants/constants.message-response';
import { AppDataSource } from '../data-source';
import { Follows } from '../entities/follow.entity';
import { EqueryFollowType } from '../constants/constant';
import { selectFollow } from '../utils/utils.select-fields';
import { followRelations } from '../utils/utils.relation-field';

export class FollowService {
  private followRepository = AppDataSource.getRepository(Follows);
  private selectFields: string[] | unknown = selectFollow;

  async createFollow(
    userId: string,
    followedId: string
  ): Promise<Follows | string> {
    const followDto = {
      userFollowId: userId,
      userFollowedId: followedId,
    };
    const follow = await this.followRepository.findOne({
      where: followDto,
    });
    if (follow) {
      await this.followRepository.delete(follow.id);
      return followMsg.delete;
    }
    const result = await this.followRepository.save(followDto);
    return result;
  }

  async getListFollowOfMe(queryDto: IqueryFollow, userId: string) {
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
      select: this.selectFields,
    });
    const total = await this.followRepository.findAndCount({
      where: query,
    });
    return { results, total: total[1] ?? 0 };
  }
}
