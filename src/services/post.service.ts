import {
  IcreatePost,
  Iattchment,
  IqueryPost,
} from '../interfaces/post-share-like.interface';
import { Equal, Like } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Posts } from '../entities/post.entity';
import { Response } from 'express';
import { Attachments } from '../entities/attachment.entity';
import * as dotenv from 'dotenv';
import { IfileUploadType } from '../interfaces/file-upload.interface';
import { CommonException } from '../exceptions/exceptions.common-error';
import { postMsg } from '../constants/constants.message-response';
import { postRelation } from '../utils/utils.relation-field';
import { selectPost } from '../utils/utils.select-fields';
dotenv.config();

export class PostService {
  private postRepository = AppDataSource.getRepository(Posts);
  private attachmentRepository = AppDataSource.getRepository(Attachments);
  private selectFields: string[] | unknown = selectPost;

  async createPost(
    body: IcreatePost,
    fileImages,
    userId: string
  ): Promise<Posts> {
    const createPostDto = { ...body, userId };
    const post = await this.postRepository.save(createPostDto);
    const attachmentDto: Iattchment[] = this.attachmentDto(fileImages, post.id);
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
      relations: postRelation,
      select: this.selectFields,
    });
    const total = await this.postRepository.count();
    return { results, total };
  }

  async findById(id: string) {
    const result = await this.postRepository.findOne({
      where: { id: Equal(id) },
      relations: postRelation,
      select: this.selectFields,
    });
    return result;
  }

  async updatePost(
    res: Response,
    postId: string,
    body: IcreatePost,
    fileImages,
    userId: string
  ): Promise<Posts | object> {
    const post = await this.findById(postId);
    if (String(post.userId) !== String(userId)) {
      return new CommonException(res, 403, postMsg.notPermission);
    }
    await this.postRepository.update(postId, body);
    const attachmentDto: Iattchment[] = this.attachmentDto(fileImages, postId);
    await this.attachmentRepository.save(attachmentDto);
    const result = await this.findById(postId);
    return result;
  }

  async deletePost(
    res: Response,
    id: string,
    userId: string
  ): Promise<void | object> {
    const post = await this.findById(id);
    if (String(post.userId) !== String(userId)) {
      return new CommonException(res, 403, postMsg.notPermission);
    }
    await this.postRepository.softRemove(post);
  }

  attachmentDto(fileImages: IfileUploadType[], postId: string) {
    const dto: Iattchment[] = fileImages.map((item: IfileUploadType) => {
      return {
        url: `${process.env.URL_IMAGE_UPLOAD}/${item.filename}`,
        originalname: item?.originalname,
        postId,
      };
    });
    return dto;
  }
}
