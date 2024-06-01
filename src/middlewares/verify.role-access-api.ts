import { Request, Response, NextFunction } from 'express';
import { UnAuthorizedException } from '../exceptions/exceptions.unauthorized';
import { CommonException } from '../exceptions/exceptions.common-error';
import { serverError } from '../constants/constants.message-response';
import { requestInfo } from '../constants/constant';
import { httpStatusCode } from '../constants/constants.httpStatusCode';

export const VerifyRoleAccess = (roles: Array<string>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req[requestInfo.USER];
      if (!roles.includes(user?.role)) {
        return new UnAuthorizedException(res);
      }
      next();
    } catch {
      return new CommonException(
        res,
        httpStatusCode.SERVER_INTERVEL,
        serverError
      );
    }
  };
};
