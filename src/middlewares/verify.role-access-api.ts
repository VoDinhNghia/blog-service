import { Request, Response, NextFunction } from 'express';
import { UnAuthorizedException } from '../exceptions/exceptions.unauthorized';
import { CommonException } from '../exceptions/exceptions.common-error';
import { serverError } from '../constants/constants.message-response';

export const CheckRoleAccess = (roles: Array<string>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req['user'];
      if (!roles.includes(user?.role)) {
        return new UnAuthorizedException(res);
      }
      next();
    } catch {
      return new CommonException(res, 500, serverError);
    }
  };
};
