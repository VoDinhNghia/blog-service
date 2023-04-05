import { Likes } from '../entities/like.entity';
import { AppDataSource } from '../data-source';

export class LikeService {
  private likeRepository = AppDataSource.getRepository(Likes);
}
