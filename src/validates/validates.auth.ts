import { Request, Response, NextFunction } from 'express';
import { CommonException } from '../exceptions/exceptions.common-error';
import { authMsg } from '../constants/constants.message-response';

export const validBodyLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return new CommonException(res, 400, authMsg.badRequest);
    }
    next();
  } catch {}
};
