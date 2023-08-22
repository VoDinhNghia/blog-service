import { SolutionService } from '../services/solution.service';
import { Response, Request } from 'express';
import { CommonException } from '../exceptions/exceptions.common-error';
import {
  serverError,
  solutionMsg,
} from '../constants/constants.message-response';
import { ResponseController } from '../utils/utils.response';
import { requestInfo } from '../constants/constant';
import { httpStatusCode } from '../constants/constants.httpStatusCode';

export default class SolutionController {
  static service = new SolutionService();

  static createSolution = async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const userId = req[requestInfo.USER].id;
      const result = await this.service.createSolution(res, body, userId);
      if (!res.headersSent) {
        new ResponseController(res, result, solutionMsg.create);
      }
    } catch (error) {
      new CommonException(res, httpStatusCode.SERVER_INTERVEL, serverError);
    }
  };

  static deleteSolution = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const userId = req[requestInfo.USER].id;
      await this.service.deleteSolution(res, id, userId);
      if (!res.headersSent) {
        new ResponseController(res, true, solutionMsg.delete);
      }
    } catch (error) {
      new CommonException(res, httpStatusCode.SERVER_INTERVEL, serverError);
    }
  };

  static updateSolution = async (req: Request, res: Response) => {
    try {
      const {
        body: { solution = '' },
      } = req;
      const id = req.params.id;
      const userId = req[requestInfo.USER].id;
      await this.service.updateSolution(res, id, solution, userId);
      if (!res.headersSent) {
        new ResponseController(res, true, solutionMsg.update);
      }
    } catch (error) {
      new CommonException(res, httpStatusCode.SERVER_INTERVEL, serverError);
    }
  };
}
