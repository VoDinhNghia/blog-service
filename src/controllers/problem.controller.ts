import { ProblemService } from '../services/problem.service';
import { Response, Request } from 'express';
import { CommonException } from '../exceptions/exceptions.common-error';
import {
  problemMsg,
  serverError,
} from '../constants/constants.message-response';
import { ResponseController } from '../utils/utils.response';

export default class ProblemController {
  static service = new ProblemService();

  static createProblem = async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const userId = req['user'].id;
      const result = await this.service.createProblem(res, body, userId);
      if (!res.headersSent) {
        new ResponseController(res, result, problemMsg.create);
      }
    } catch (error) {
      new CommonException(res, 500, serverError);
    }
  };
}
