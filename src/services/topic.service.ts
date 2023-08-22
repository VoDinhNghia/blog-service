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
import { Equal } from 'typeorm';
import { topicRelations } from '../utils/utils.relation-field';
import { httpStatusCode } from '../constants/constants.httpStatusCode';

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
    return new CommonException(
      res,
      httpStatusCode.FORBIDEN,
      topicMsg.notPermission
    );
  }

  async findTopicById(
    res: Response,
    id: string
  ): Promise<StudyTopics | object> {
    const result = await this.topicRepository.findOne({
      where: {
        id: Equal(id),
      },
      relations: topicRelations,
    });
    if (!result) {
      return new CommonException(
        res,
        httpStatusCode.NOT_FOUND,
        topicMsg.notFoud
      );
    }
    return result;
  }

  async updateTopic(
    res: Response,
    id: string,
    body: IcreateTopic,
    userId: string
  ): Promise<void | object> {
    await this.checkTopicAndPermisson(res, id, userId);
    await this.topicRepository.update(id, body);
  }

  async deleteTopic(
    res: Response,
    id: string,
    userId: string
  ): Promise<void | object> {
    const result = await this.checkTopicAndPermisson(res, id, userId);
    await this.topicRepository.softRemove(result);
  }

  async checkTopicAndPermisson(
    res: Response,
    id: string,
    userId: string
  ): Promise<StudyTopics | object> {
    const topic = await this.topicRepository.findOne({
      where: {
        id: Equal(id),
      },
    });
    if (!topic) {
      return new CommonException(
        res,
        httpStatusCode.NOT_FOUND,
        topicMsg.notFoud
      );
    }
    if (String(topic?.createdById) !== String(userId)) {
      return new CommonException(
        res,
        httpStatusCode.FORBIDEN,
        topicMsg.notPermission
      );
    }
    return topic;
  }
}
