import { Request, Response, NextFunction } from 'express';
import { CommonException } from '../exceptions/exceptions.common-error';
import { userMsg } from '../constants/constants.message-response';
import { keyAccessBackend } from '../constants/constant';

export const validKeyAccess = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.headers['key-access-secret'];
    if (accessToken !== keyAccessBackend) {
      return new CommonException(res, 403, userMsg.syncData.validKey);
    }
    next();
  } catch {}
};
