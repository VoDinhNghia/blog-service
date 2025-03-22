import { Request, Response, NextFunction } from 'express';
import { CommonException } from '../exceptions/common-error.exception';
import { userMsg } from '../constants/message-response.constant';
import { keyAccessBackend, keyAccessHeaderHttp } from '../constants/constant';

export const validKeyAccess = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.headers[keyAccessHeaderHttp];
    if (accessToken !== keyAccessBackend) {
      return new CommonException(res, 403, userMsg.syncData.validKey);
    }
    next();
  } catch {}
};
