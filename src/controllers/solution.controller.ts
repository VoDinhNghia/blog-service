import { SolutionService } from '../services/solution.service';
import { Response, Request } from 'express';
import { CommonException } from '../exceptions/common-error.exception';
import {
  serverError,
  solutionMsg,
} from '../constants/message-response.constant';
import { requestInfo } from '../constants/constant';
import { httpStatusCode } from '../constants/http-status-code.constant';
import { HandleResponseError } from '../utils/handle-response.util';

export default class SolutionController {
  static service = new SolutionService();

  static createSolution = async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const userId = req[requestInfo.USER].id;
      const result = await this.service.createSolution(res, body, userId);
      HandleResponseError(res, result, solutionMsg.create);
    } catch (error) {
      new CommonException(res, httpStatusCode.SERVER_INTERVEL, serverError);
    }
  };

  static deleteSolution = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const userId = req[requestInfo.USER].id;
      await this.service.deleteSolution(res, id, userId);
      HandleResponseError(res, true, solutionMsg.delete);
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
      HandleResponseError(res, true, solutionMsg.update);
    } catch (error) {
      new CommonException(res, httpStatusCode.SERVER_INTERVEL, serverError);
    }
  };
}
