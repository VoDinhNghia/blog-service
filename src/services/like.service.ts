import { Likes } from '../entities/like.entity';
import { AppDataSource } from '../data-source';
import { Response } from 'express';
import { IlikePost } from '../interfaces/post.interface';
import { ElikeType } from '../constants/constant';
import { Shares } from '../entities/share.entity';
import { Posts } from '../entities/post.entity';
import { CommonException } from '../exceptions/exceptions.common-error';
import {
  likeMsg,
  postMsg,
  shareMsg,
} from '../constants/constants.message-response';

export class LikeService {
  private likeRepository = AppDataSource.getRepository(Likes);
  private shareRepository = AppDataSource.getRepository(Shares);
  private postRepository = AppDataSource.getRepository(Posts);

  async createLike(
    res: Response,
    body: IlikePost,
    userId: string
  ): Promise<Likes | object | string> {
    const { type, postId, shareId } = body;
    let createDto = {};
    if (type === ElikeType.SHARE) {
      const shareInfo = await this.shareRepository.findOne({
        where: { id: shareId, userId },
      });
      if (!shareInfo) {
        return new CommonException(res, 404, shareMsg.notFound);
      }
      createDto = { shareId, type, userId };
    } else {
      const postInfo = await this.postRepository.findOne({
        where: { id: postId, userId },
      });
      if (!postInfo) {
        return new CommonException(res, 404, postMsg.notFound);
      }
      createDto = { postId, type, userId };
    }
    const checkLike = await this.likeRepository.findOne({
      where: createDto,
    });
    if (checkLike) {
      await this.likeRepository.delete(checkLike.id);
      return likeMsg.delete;
    }
    const result = await this.likeRepository.save(createDto);
    return result;
  }
}
