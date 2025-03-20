import { TopicService } from '../services/topic.service';
import { Response, Request } from 'express';
import { CommonException } from '../exceptions/exceptions.common-error';
import { serverError, topicMsg } from '../constants/constants.message-response';
import { requestInfo } from '../constants/constant';
import { httpStatusCode } from '../constants/constants.httpStatusCode';
import { HandleResponseError } from '../utils/util.handle-response';

export default class TopicController {
  static service = new TopicService();

  static createTopic = async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const userId = req[requestInfo.USER].id;
      const result = await this.service.createTopic(res, body, userId);
      HandleResponseError(res, result, topicMsg.create);
    } catch (error) {
      new CommonException(res, httpStatusCode.SERVER_INTERVEL, serverError);
    }
  };

  static getTopicById = async (req: Request, res: Response) => {
    try {
      const topicId = req?.params?.id;
      const result = await this.service.findTopicById(res, topicId);
      HandleResponseError(res, result, topicMsg.getById);
    } catch (error) {
      new CommonException(res, httpStatusCode.SERVER_INTERVEL, serverError);
    }
  };

  static updateTopic = async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const topicId = req?.params?.id;
      const userId = req[requestInfo.USER].id;
      await this.service.updateTopic(res, topicId, body, userId);
      HandleResponseError(res, true, topicMsg.update);
    } catch (error) {
      new CommonException(res, httpStatusCode.SERVER_INTERVEL, serverError);
    }
  };

  static deleteTopic = async (req: Request, res: Response) => {
    try {
      const topicId = req?.params?.id;
      const userId = req[requestInfo.USER].id;
      await this.service.deleteTopic(res, topicId, userId);
      HandleResponseError(res, true, topicMsg.delete);
    } catch (error) {
      new CommonException(res, httpStatusCode.SERVER_INTERVEL, serverError);
    }
  };
}
