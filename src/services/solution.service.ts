import { StudySolutions } from '../entities/study-solution.entity';
import { AppDataSource } from '../data-source';
import { IcreateSolution } from '../interfaces/study.interface';
import { Response } from 'express';
import { StudyProblems } from '../entities/study-problem.entity';
import { problemMsg } from '../constants/constants.message-response';
import { CommonException } from '../exceptions/exceptions.common-error';

export class SolutionService {
  private solutionRepository = AppDataSource.getRepository(StudySolutions);
  private problemRepository = AppDataSource.getRepository(StudyProblems);

  async createSolution(
    res: Response,
    body: IcreateSolution,
    userId: string
  ): Promise<StudySolutions | object> {
    const topic = await this.problemRepository.findOne({
      where: {
        id: body?.problemId,
        deletedAt: null,
      },
    });
    if (!topic) {
      return new CommonException(res, 404, problemMsg.notFoud);
    }
    const solutionDto = {
      ...body,
      createdById: userId,
    };
    const result = await this.solutionRepository.save(solutionDto);
    return result;
  }
}
