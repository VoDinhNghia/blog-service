import { Response } from 'express';
import { httpStatusCode } from '../constants/constants.httpStatusCode';
export class UnAuthorizedException {
  constructor(res: Response) {
    res.status(httpStatusCode.UN_AUTHORIZED).send({
      statusCode: httpStatusCode.UN_AUTHORIZED,
      message: 'Unauthorized',
    });
  }
}
