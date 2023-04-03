import { Request, Response, NextFunction } from 'express';
import { CommonException } from '../exceptions/exceptions.common-error';
import { validateEmail } from './validates.email';
import { userMsg } from '../constants/constants.message-response';
import { EuserRole, keyAccessBackend } from '../constants/constant';

export const validBody = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return new CommonException(res, 400, userMsg.validateBody.notEmpty);
    }
    if (!validateEmail(email)) {
      return new CommonException(res, 400, userMsg.validateBody.validEmail);
    }
    if (password.length < 6) {
      return new CommonException(res, 400, userMsg.validateBody.lengthPassword);
    }
    if (!Object.values(EuserRole).includes(role)) {
      return new CommonException(res, 400, userMsg.validateBody.role);
    }
    next();
  } catch {}
};

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
