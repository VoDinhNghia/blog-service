import { SolutionService } from '../services/solution.service';
import { Response, Request } from 'express';
import { CommonException } from '../exceptions/exceptions.common-error';
import {
  serverError,
  solutionMsg,
} from '../constants/constants.message-response';
import { ResponseController } from '../utils/utils.response';

export default class SolutionController {
  static service = new SolutionService();

  static createSolution = (req: Request, res: Response) => {
    try {
      const { body } = req;
      const userId = req['user'].id;
      if (!res.headersSent) {
        new ResponseController(res, { body, userId }, solutionMsg.create);
      }
    } catch (error) {
      new CommonException(res, 500, serverError);
    }
  };
}
