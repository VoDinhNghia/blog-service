import {
  IqueryShare,
  IsharePost,
} from '../interfaces/post-share-like.interface';
import { AppDataSource } from '../data-source';
import { Shares } from '../entities/share.entity';
import { Response } from 'express';
import { Posts } from '../entities/post.entity';
import { CommonException } from '../exceptions/exceptions.common-error';
import { postMsg, shareMsg } from '../constants/constants.message-response';
import { shareRelations } from '../utils/utils.relation-field';
import { Equal } from 'typeorm';

export class ShareService {
  private shareRepository = AppDataSource.getRepository(Shares);
  private postRepository = AppDataSource.getRepository(Posts);
  private relationFields: string[] = shareRelations;

  async createShare(
    res: Response,
    body: IsharePost,
    userId: string
  ): Promise<Shares | object> {
    const { postId, privateMode } = body;
    const post = await this.postRepository.findOne({
      where: { id: postId, deletedAt: null },
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
      where: { id: Equal(id) },
      relations: this.relationFields,
    });
    if (!result) {
      return new CommonException(res, 404, shareMsg.notFound);
    }
    return result;
  }

  async deleteShare(
    res: Response,
    id: string,
    userId: string
  ): Promise<void | object> {
    const result: IsharePost = await this.shareRepository.findOne({
      where: { id: Equal(id) },
    });
    if (result.userId !== userId) {
      return new CommonException(res, 403, shareMsg.notPermission);
    }
    await this.shareRepository.delete(id);
  }

  async updateMode(
    res: Response,
    shareId: string,
    body: IsharePost,
    userId: string
  ): Promise<Shares | object> {
    const share: IsharePost = await this.shareRepository.findOne({
      where: { id: shareId },
      select: ['userId'],
    });
    if (share?.userId !== userId) {
      return new CommonException(res, 403, shareMsg.notPermission);
    }
    await this.shareRepository.update(shareId, body);
    const result = await this.findShareById(res, shareId);
    return result;
  }

  async findAllShare(
    queryDto: IqueryShare,
    userId: string
  ): Promise<{ results: Shares[]; total: number }> {
    const { limit, page, privateMode } = queryDto;
    const query: IqueryShare = { userId };
    if (privateMode) {
      query.privateMode = privateMode;
    }
    const results = await this.shareRepository.find({
      where: query,
      skip: limit && page ? Number(limit) * (Number(page) - 1) : null,
      take: limit ? Number(limit) : null,
      relations: this.relationFields,
      order: {
        createdAt: 'DESC',
      },
    });
    const total = await this.shareRepository.findAndCount({
      where: query,
    });
    return { results, total: total[1] ?? 0 };
  }
}
