import { followMsg } from '../constants/constants.message-response';
import { AppDataSource } from '../data-source';
import { Follows } from '../entities/follow.entity';

export class FollowService {
  private followRepository = AppDataSource.getRepository(Follows);

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
}
