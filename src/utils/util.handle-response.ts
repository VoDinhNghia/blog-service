/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import { ResponseController } from './utils.response';
import { CommonException } from '../exceptions/exceptions.common-error';
import { serverError } from '../constants/constants.message-response';
import { httpStatusCode } from '../constants/constants.httpStatusCode';

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
