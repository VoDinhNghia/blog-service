import { StudySolutions } from '../entities/study-solution.entity';
import { AppDataSource } from '../data-source';
import {
  IcreateSolution,
  IresultSolution,
} from '../interfaces/study.interface';
import { Response } from 'express';
import { StudyProblems } from '../entities/study-problem.entity';
import {
  problemMsg,
  solutionMsg,
} from '../constants/constants.message-response';
import { CommonException } from '../exceptions/exceptions.common-error';
import { Equal } from 'typeorm';
import { httpStatusCode } from '../constants/constants.httpStatusCode';

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
      return new CommonException(
        res,
        httpStatusCode.NOT_FOUND,
        problemMsg.notFoud
      );
    }
    const solutionDto = {
      ...body,
      createdById: userId,
    };
    const result = await this.solutionRepository.save(solutionDto);
    return result;
  }

  async deleteSolution(
    res: Response,
    id: string,
    userId: string
  ): Promise<void | object> {
    const result: IresultSolution = await this.findSolutionById(res, id);
    if (
      result.problem.createdById !== userId ||
      result.createdById !== userId
    ) {
      return new CommonException(
        res,
        httpStatusCode.FORBIDEN,
        solutionMsg.notPermission
      );
    }
    await this.solutionRepository.delete(id);
  }

  async updateSolution(
    res: Response,
    id: string,
    solution: string,
    userId: string
  ): Promise<void | object> {
    const result: IresultSolution = await this.findSolutionById(res, id);
    if (result.createdById !== userId) {
      return new CommonException(
        res,
        httpStatusCode.FORBIDEN,
        solutionMsg.notPermission
      );
    }
    await this.solutionRepository.update(id, { solution });
  }

  async findSolutionById(
    res: Response,
    id: string
  ): Promise<StudySolutions | object> {
    const solution = await this.solutionRepository.findOne({
      where: {
        id: Equal(id),
        deletedAt: null,
      },
      relations: ['problem'],
    });
    if (!solution) {
      return new CommonException(
        res,
        httpStatusCode.NOT_FOUND,
        solutionMsg.notFound
      );
    }
    return solution;
  }
}
