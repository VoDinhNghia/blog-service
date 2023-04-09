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

  static createProblem = (req: Request, res: Response) => {
    try {
      const { body } = req;
      const userId = req['user'].id;
      if (!res.headersSent) {
        new ResponseController(res, { body, userId }, problemMsg.create);
      }
    } catch (error) {
      new CommonException(res, 500, serverError);
    }
  };
}
