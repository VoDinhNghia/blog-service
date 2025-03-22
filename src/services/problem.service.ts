import { Icreateproblem } from '../interfaces/study.interface';
import { AppDataSource } from '../data-source';
import { StudyProblems } from '../entities/study-problem.entity';
import { StudyTopics } from '../entities/study-topic.entity';
import { CommonException } from '../exceptions/common-error.exception';
import { problemMsg, topicMsg } from '../constants/message-response.constant';
import { Response } from 'express';
import { Equal } from 'typeorm';
import { httpStatusCode } from '../constants/http-status-code.constant';

export class ProblemService {
  private problemRepository = AppDataSource.getRepository(StudyProblems);
  private topicRepository = AppDataSource.getRepository(StudyTopics);

  async createProblem(
    res: Response,
    body: Icreateproblem,
    userId: string
  ): Promise<StudyProblems | object> {
    const topic = await this.topicRepository.findOne({
      where: {
        id: body?.topicId,
        deletedAt: null,
      },
    });
    if (!topic) {
      return new CommonException(
        res,
        httpStatusCode.NOT_FOUND,
        topicMsg.notFoud
      );
    }
    const problemDto = {
      ...body,
      createdById: userId,
    };
    const result = await this.problemRepository.save(problemDto);
    return result;
  }

  async updateProblem(
    res: Response,
    id: string,
    body: Icreateproblem,
    userId: string
  ): Promise<void | object> {
    await this.checkPermission(res, id, userId);
    await this.problemRepository.update(id, body);
  }

  async deleteProblem(
    res: Response,
    id: string,
    userId: string
  ): Promise<void | object> {
    await this.checkPermission(res, id, userId);
    await this.problemRepository.delete(id);
  }

  async checkPermission(
    res: Response,
    id: string,
    userId: string
  ): Promise<StudyProblems | object> {
    const problem = await this.problemRepository.findOne({
      where: {
        id: Equal(id),
      },
      relations: {
        topic: true,
      },
    });
    if (!problem) {
      return new CommonException(
        res,
        httpStatusCode.NOT_FOUND,
        problemMsg.notFoud
      );
    }
    if (
      String(problem?.createdById) === String(userId) ||
      String(problem?.topic?.createdById) === String(userId)
    ) {
      return problem;
    } else {
      return new CommonException(
        res,
        httpStatusCode.FORBIDEN,
        problemMsg.notPermission
      );
    }
  }
}
