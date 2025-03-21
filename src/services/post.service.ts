import {
  IcreatePost,
  Iattchment,
  IqueryPost,
} from '../interfaces/post-share-like.interface';
import { Equal, In, Like } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Posts } from '../entities/post.entity';
import { Response } from 'express';
import { Attachments } from '../entities/attachment.entity';
import * as dotenv from 'dotenv';
import { IfileUploadType } from '../interfaces/file-upload.interface';
import { CommonException } from '../exceptions/common-error.exception';
import { postMsg } from '../constants/message-response.constant';
import { postRelation } from '../utils/relation-field.util';
import { unlinkSync } from 'fs';
dotenv.config();
import { httpStatusCode } from '../constants/http-status-code.constant';

export class PostService {
  private postRepository = AppDataSource.getRepository(Posts);
  private attachmentRepository = AppDataSource.getRepository(Attachments);

  async createPost(
    body: IcreatePost,
    fileImages,
    userId: string
  ): Promise<Posts> {
    const { privateMode = false } = body;
    body.privateMode = String(privateMode) === 'true' ? true : false;
    const createPostDto = { ...body, userId };
    const post = await this.postRepository.save(createPostDto);
    const attachmentDto: Iattchment[] = this.attachmentDto(fileImages, post.id);
    const attachments = await this.attachmentRepository.save(attachmentDto);
    post.attachments = attachments;
    return post;
  }

  async findAllPosts(
    queryDto: IqueryPost,
    userReq: string
  ): Promise<{ results: Posts[]; total: number }> {
    const { limit, page, userId, searchKey } = queryDto;
    const query: IqueryPost = { privateMode: false };
    if (userId) {
      query.userId = userId;
      if (String(userId) === String(userReq)) {
        query.privateMode = In([false, true]);
      }
    }
    if (searchKey) {
      query.title = Like(`%${searchKey}%`);
    }
    const results = await this.postRepository.find({
      where: query,
      skip: limit && page ? Number(limit) * (Number(page) - 1) : null,
      take: limit ? Number(limit) : null,
      relations: postRelation,
      order: {
        createdAt: 'DESC',
      },
    });
    const total = await this.postRepository.findAndCount({
      where: query,
    });
    return { results, total: total[1] ?? 0 };
  }

  async findById(id: string) {
    const result = await this.postRepository.findOne({
      where: { id: Equal(id) },
      relations: postRelation,
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
    const { privateMode } = body;
    const post = await this.findById(postId);
    if (String(post.userId) !== String(userId)) {
      return new CommonException(
        res,
        httpStatusCode.FORBIDEN,
        postMsg.notPermission
      );
    }
    if (privateMode) {
      body.privateMode = String(privateMode) === 'true' ? true : false;
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
      return new CommonException(
        res,
        httpStatusCode.FORBIDEN,
        postMsg.notPermission
      );
    }
    await this.postRepository.softRemove(post);
  }

  async deleteImage(
    res: Response,
    id: string,
    userId: string
  ): Promise<void | object> {
    const image = await this.attachmentRepository.findOne({
      where: { id: Equal(id) },
    });
    if (!image) {
      return new CommonException(
        res,
        httpStatusCode.NOT_FOUND,
        postMsg.notFoundImage
      );
    }
    const post = await this.findById(image?.postId);
    if (String(post.userId) !== String(userId)) {
      return new CommonException(
        res,
        httpStatusCode.FORBIDEN,
        postMsg.notPermissionImage
      );
    }
    await this.attachmentRepository.delete(id);
    try {
      unlinkSync(image?.path);
    } catch (error) {
      console.log(error);
    }
  }

  attachmentDto(fileImages: IfileUploadType[], postId: string) {
    const dto: Iattchment[] = fileImages.map((item: IfileUploadType) => {
      return {
        url: `${process.env.URL_IMAGE_UPLOAD}/${item?.filename}`,
        originalname: item?.originalname,
        postId,
        filename: item?.filename,
        path: item?.path,
      };
    });
    return dto;
  }

  async findOnePost(
    condWhere: object,
    relationObj = null
  ): Promise<Posts | object> {
    const post = await this.postRepository.findOne({
      where: condWhere,
      relations: relationObj,
    });
    return post;
  }
}
