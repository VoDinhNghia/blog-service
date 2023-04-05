import {
  IcreatePost,
  Iattchment,
  IqueryPost,
} from '../interfaces/post.interface';
import { Like } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Posts } from '../entities/post.entity';
import { Attachments } from '../entities/attachment.entity';
import * as dotenv from 'dotenv';
import { IfileUploadType } from '../interfaces/file-upload.interface';
dotenv.config();

export class PostService {
  private postRepository = AppDataSource.getRepository(Posts);
  private attachmentRepository = AppDataSource.getRepository(Attachments);

  async createPost(
    body: IcreatePost,
    fileImages,
    userId: string
  ): Promise<Posts> {
    const createPostDto = { ...body, userId };
    const post = await this.postRepository.save(createPostDto);
    const attachmentDto: Iattchment[] = fileImages.map(
      (item: IfileUploadType) => {
        return {
          url: `${process.env.URL_IMAGE_UPLOAD}/${item.filename}`,
          originalname: item?.originalname,
          postId: post.id,
        };
      }
    );
    const attachments = await this.attachmentRepository.save(attachmentDto);
    post.attachments = attachments;
    return post;
  }

  async findAllPosts(
    queryDto: IqueryPost
  ): Promise<{ results: Posts[]; total: number }> {
    const { limit, page, userId, searchKey } = queryDto;
    const query: IqueryPost = {};
    if (userId) {
      query.userId = userId;
    }
    if (searchKey) {
      query.title = Like(`%${searchKey}%`);
    }
    const results = await this.postRepository.find({
      where: query,
      skip: limit && page ? Number(limit) * (Number(page) - 1) : null,
      take: limit ? Number(limit) : null,
      relations: {
        attachments: true,
      },
    });
    const total = await this.postRepository.count();
    return { results, total };
  }
}
