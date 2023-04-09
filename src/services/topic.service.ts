import { AppDataSource } from '../data-source';
import { StudyTopics } from '../entities/study-topic.entity';
import { Response } from 'express';
import {
  IcreateTopic,
  IresultFindGroup,
  IresultMember,
} from '../interfaces/study.interface';
import { GroupService } from './group.service';
import { CommonException } from '../exceptions/exceptions.common-error';
import { topicMsg } from '../constants/constants.message-response';

export class TopicService {
  private topicRepository = AppDataSource.getRepository(StudyTopics);
  private groupSerivce = new GroupService();

  async createTopic(
    res: Response,
    body: IcreateTopic,
    userId: string
  ): Promise<StudyTopics | object> {
    const { groupId } = body;
    const group: IresultFindGroup = await this.groupSerivce.findGoupById(
      res,
      groupId
    );
    const checkMember = group?.members?.find(
      (member: IresultMember) => String(member?.memberId) === String(userId)
    );
    if (checkMember || group.createdById === userId) {
      const topicDto = {
        ...body,
        createdById: userId,
      };
      const result = await this.topicRepository.save(topicDto);
      return result;
    }
    return new CommonException(res, 403, topicMsg.notPermission);
  }
}
