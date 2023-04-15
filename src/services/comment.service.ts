import { IcreateComment } from '../interfaces/post-share-like.interface';
import { AppDataSource } from '../data-source';
import { Comments } from '../entities/comment.entity';
import { Response } from 'express';
import { Posts } from '../entities/post.entity';
import { CommonException } from '../exceptions/exceptions.common-error';
import { commentMsg, postMsg } from '../constants/constants.message-response';
import { Equal } from 'typeorm';

export class CommentService {
  private commentRepository = AppDataSource.getRepository(Comments);
  private postRepository = AppDataSource.getRepository(Posts);

  async createComment(
    res: Response,
    body: IcreateComment,
    userId: string
  ): Promise<Comments | object> {
    const { postId } = body;
    const post = await this.postRepository.findOne({
      where: {
        id: postId,
        deletedAt: null,
      },
    });
    if (!post) {
      return new CommonException(res, 404, postMsg.notFound);
    }
    const commentDto = {
      ...body,
      userId,
    };
    const result = await this.commentRepository.save(commentDto);
    return result;
  }

  async updateComment(
    res: Response,
    id: string,
    body: IcreateComment,
    userId: string
  ): Promise<void | object> {
    const comment = await this.commentRepository.findOne({
      where: {
        id: Equal(id),
      },
    });
    if (!comment) {
      return new CommonException(res, 404, commentMsg.notFound);
    }
    if (String(userId) !== String(comment.userId)) {
      return new CommonException(res, 403, commentMsg.notPermission);
    }
    await this.commentRepository.update(id, body);
  }

  async deleteComment(
    res: Response,
    id: string,
    userId: string
  ): Promise<void | object> {
    const comment = await this.commentRepository.findOne({
      where: {
        id: Equal(id),
      },
      relations: {
        post: true,
      },
    });
    if (!comment) {
      return new CommonException(res, 404, commentMsg.notFound);
    }
    if (
      String(userId) === String(comment.userId) ||
      String(userId) === String(comment.post?.userId)
    ) {
      await this.commentRepository.delete(id);
    } else {
      return new CommonException(res, 403, commentMsg.notPermission);
    }
  }
}
