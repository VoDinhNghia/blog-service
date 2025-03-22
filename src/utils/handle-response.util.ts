/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import { ResponseController } from './response.util';
import { CommonException } from '../exceptions/common-error.exception';
import { serverError } from '../constants/message-response.constant';
import { httpStatusCode } from '../constants/http-status-code.constant';

export const HandleResponseError = (
  res: Response,
  result: any,
  message: string
) => {
  if (!res.headersSent) {
    return new ResponseController(res, result, message);
  } else {
    return new CommonException(
      res,
      httpStatusCode.SERVER_INTERVEL,
      serverError
    );
  }
};
