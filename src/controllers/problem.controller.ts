import { ProblemService } from '../services/problem.service';
import { Response, Request } from 'express';
import { CommonException } from '../exceptions/exceptions.common-error';
import {
  problemMsg,
  serverError,
} from '../constants/constants.message-response';
import { ResponseController } from '../utils/utils.response';
import { requestInfo } from '../constants/constant';
import { httpStatusCode } from '../constants/constants.httpStatusCode';

export default class ProblemController {
  static service = new ProblemService();

  static createProblem = async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const userId = req[requestInfo.USER].id;
      const result = await this.service.createProblem(res, body, userId);
      if (!res.headersSent) {
        new ResponseController(res, result, problemMsg.create);
      }
    } catch (error) {
      new CommonException(res, httpStatusCode.SERVER_INTERVEL, serverError);
    }
  };

  static updateProblem = async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const userId = req[requestInfo.USER].id;
      const id = req.params.id;
      await this.service.updateProblem(res, id, body, userId);
      if (!res.headersSent) {
        new ResponseController(res, true, problemMsg.update);
      }
    } catch (error) {
      new CommonException(res, httpStatusCode.SERVER_INTERVEL, serverError);
    }
  };

  static deleteProblem = async (req: Request, res: Response) => {
    try {
      const userId = req[requestInfo.USER].id;
      const id = req.params.id;
      await this.service.deleteProblem(res, id, userId);
      if (!res.headersSent) {
        new ResponseController(res, true, problemMsg.delete);
      }
    } catch (error) {
      new CommonException(res, httpStatusCode.SERVER_INTERVEL, serverError);
    }
  };
}
