import { IcreatePost, Iattchment } from '../interfaces/post.interface';
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
}
