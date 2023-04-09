import { TopicService } from '../services/topic.service';
import { Response, Request } from 'express';
import { CommonException } from '../exceptions/exceptions.common-error';
import { serverError, topicMsg } from '../constants/constants.message-response';
import { ResponseController } from '../utils/utils.response';

export default class TopicController {
  static service = new TopicService();

  static createTopic = async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const userId = req['user'].id;
      const result = await this.service.createTopic(res, body, userId);
      if (!res.headersSent) {
        new ResponseController(res, result, topicMsg.create);
      }
    } catch (error) {
      new CommonException(res, 500, serverError);
    }
  };

  static getTopicById = async (req: Request, res: Response) => {
    try {
      const topicId = req?.params?.id;
      const result = await this.service.findTopicById(res, topicId);
      if (!res.headersSent) {
        new ResponseController(res, result, topicMsg.getById);
      }
    } catch (error) {
      new CommonException(res, 500, serverError);
    }
  };
}
