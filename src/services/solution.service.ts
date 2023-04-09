import { StudySolutions } from '../entities/study-solution.entity';
import { AppDataSource } from '../data-source';

export class SolutionService {
  private solutionRepository = AppDataSource.getRepository(StudySolutions);
}
