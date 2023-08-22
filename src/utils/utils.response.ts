import { Response } from 'express';
import { httpStatusCode } from '../constants/constants.httpStatusCode';
export class ResponseController {
  constructor(
    res: Response,
    data: object | object[] | string | boolean | number,
    message: string
  ) {
    res
      .status(httpStatusCode.OK)
      .send({ statusCode: httpStatusCode.OK, data, message });
  }
}
