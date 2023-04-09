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

  static createSolution = async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const userId = req['user'].id;
      const result = await this.service.createSolution(res, body, userId);
      if (!res.headersSent) {
        new ResponseController(res, result, solutionMsg.create);
      }
    } catch (error) {
      new CommonException(res, 500, serverError);
    }
  };
}
