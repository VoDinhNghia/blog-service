import { AppDataSource } from '../data-source';
import { Shares } from '../entities/share.entity';

export class ShareService {
  private shareRepository = AppDataSource.getRepository(Shares);
}
