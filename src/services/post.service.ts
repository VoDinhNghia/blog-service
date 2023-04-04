import { AppDataSource } from '../data-source';
import { Posts } from '../entities/post.entity';

export class PostService {
  private postRepository = AppDataSource.getRepository(Posts);
}
