import { Likes } from '../entities/like.entity';
import { AppDataSource } from '../data-source';
import { Response } from 'express';
import { IlikePost } from '../interfaces/post-share-like.interface';
import { ElikeAction, ElikeType } from '../constants/constant';
import { Shares } from '../entities/share.entity';
import { Posts } from '../entities/post.entity';
import { CommonException } from '../exceptions/exceptions.common-error';
import {
  likeMsg,
  postMsg,
  shareMsg,
} from '../constants/constants.message-response';
import { httpStatusCode } from '../constants/constants.httpStatusCode';

export class LikeService {
  private likeRepository = AppDataSource.getRepository(Likes);
  private shareRepository = AppDataSource.getRepository(Shares);
  private postRepository = AppDataSource.getRepository(Posts);

  async createLike(
    res: Response,
    body: IlikePost,
    userId: string
  ): Promise<Likes | object | string> {
    const { type, postId, shareId, action = ElikeAction.LIKE } = body;
    let createDto = {};
    if (type === ElikeType.SHARE) {
      const shareInfo = await this.shareRepository.findOne({
        where: { id: shareId, deletedAt: null },
      });
      if (!shareInfo) {
        return new CommonException(
          res,
          httpStatusCode.NOT_FOUND,
          shareMsg.notFound
        );
      }
      createDto = { shareId, type, userId };
    } else {
      const postInfo = await this.postRepository.findOne({
        where: { id: postId, deletedAt: null },
      });
      if (!postInfo) {
        return new CommonException(
          res,
          httpStatusCode.NOT_FOUND,
          postMsg.notFound
        );
      }
      createDto = { postId, type, userId };
    }
    const checkLike = await this.likeRepository.findOne({
      where: createDto,
    });
    if (checkLike) {
      if (checkLike?.action === action) {
        await this.likeRepository.delete(checkLike.id);
      } else {
        await this.likeRepository.update(checkLike?.id, { action });
      }
      return likeMsg.delete;
    }
    const result = await this.likeRepository.save({ ...createDto, action });
    return result;
  }
}
