import { Icreateproblem } from '../interfaces/study.interface';
import { AppDataSource } from '../data-source';
import { StudyProblems } from '../entities/study-problem.entity';
import { StudyTopics } from '../entities/study-topic.entity';
import { CommonException } from '../exceptions/exceptions.common-error';
import { topicMsg } from '../constants/constants.message-response';
import { Response } from 'express';

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
      return new CommonException(res, 404, topicMsg.notFoud);
    }
    const problemDto = {
      ...body,
      createdById: userId,
    };
    const result = await this.problemRepository.save(problemDto);
    return result;
  }
}
