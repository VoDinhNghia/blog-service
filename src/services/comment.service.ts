import { IcreateComment } from '../interfaces/post-share-like.interface';
import { AppDataSource } from '../data-source';
import { Comments } from '../entities/comment.entity';

export class CommentService {
  private commentRepository = AppDataSource.getRepository(Comments);

  async createComment(body: IcreateComment, userId: string): Promise<Comments> {
    const commentDto = {
      ...body,
      userId,
    };
    const result = await this.commentRepository.save(commentDto);
    return result;
  }

  async updateComment(id: string, body: IcreateComment): Promise<void> {
    await this.commentRepository.update(id, body);
  }

  async deleteComment(id: string): Promise<void> {
    await this.commentRepository.delete(id);
  }

  async findOneComment(
    conWhere: object,
    relationObj = null
  ): Promise<Comments> {
    const comment = await this.commentRepository.findOne({
      where: conWhere,
      relations: relationObj,
    });
    return comment;
  }
}
