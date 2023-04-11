import { IcreateComment } from '../interfaces/post-share-like.interface';
import { AppDataSource } from '../data-source';
import { Comments } from '../entities/comment.entity';
import { Response } from 'express';
import { Posts } from '../entities/post.entity';
import { CommonException } from '../exceptions/exceptions.common-error';
import { postMsg } from '../constants/constants.message-response';

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
}
