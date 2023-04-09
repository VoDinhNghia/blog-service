import { AppDataSource } from '../data-source';
import { StudyProblems } from '../entities/study-problem.entity';

export class ProblemService {
  private problemRepository = AppDataSource.getRepository(StudyProblems);
}
