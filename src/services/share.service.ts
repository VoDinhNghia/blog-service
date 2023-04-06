import { IsharePost } from '../interfaces/post.interface';
import { AppDataSource } from '../data-source';
import { Shares } from '../entities/share.entity';
import { Response } from 'express';
import { Posts } from '../entities/post.entity';
import { CommonException } from '../exceptions/exceptions.common-error';
import { postMsg, shareMsg } from '../constants/constants.message-response';
import { selectSharePost } from '../utils/utils.select-fields';
import { shareRelations } from '../utils/utils.relation-field';

export class ShareService {
  private shareRepository = AppDataSource.getRepository(Shares);
  private postRepository = AppDataSource.getRepository(Posts);
  private selectFields: string[] | unknown = selectSharePost;
  private relationFields: string[] = shareRelations;

  async createShare(res: Response, body: IsharePost): Promise<Shares | object> {
    const { postId, privateMode } = body;
    const userId = res.locals.jwtPayload.userId;
    const post = await this.postRepository.findOne({
      where: { id: postId, userId },
    });
    if (!post) {
      return new CommonException(res, 404, postMsg.notFound);
    }
    const share = await this.shareRepository.findOne({
      where: { postId, userId },
    });
    if (share) {
      return new CommonException(res, 409, shareMsg.existedSharePost);
    }
    const shareDto = { postId, userId, privateMode };
    const result = await this.shareRepository.save(shareDto);
    return result;
  }

  async findShareById(res: Response, id: string): Promise<Shares | object> {
    const result = await this.shareRepository.findOne({
      where: { id },
      relations: this.relationFields,
      select: this.selectFields,
    });
    if (!result) {
      return new CommonException(res, 404, shareMsg.notFound);
    }
    return result;
  }
}
