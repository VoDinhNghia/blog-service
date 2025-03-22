import { Request, Response, NextFunction } from 'express';
import { UnAuthorizedException } from '../exceptions/unauthorized.exception';
import { CommonException } from '../exceptions/common-error.exception';
import { serverError } from '../constants/message-response.constant';
import { requestInfo } from '../constants/constant';
import { httpStatusCode } from '../constants/http-status-code.constant';

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
