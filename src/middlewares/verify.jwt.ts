/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { config } from '../configs/config';
import { UnAuthorizedException } from '../exceptions/exceptions.unauthorized';
import { IuserLogin } from '../interfaces/user.interface';

export const VerifyToken = (
  req: Request & { user: IuserLogin },
  res: Response,
  next: NextFunction
) => {
  const token = req.headers['authorization'];
  try {
    const payload: IuserLogin | any = jwt.verify(
      token?.replace('Bearer ', ''),
      config.JWT_PRIVATE_KEY,
      {
        algorithms: ['HS512'],
      }
    );
    if (!payload?.id || !payload.role) {
      return new UnAuthorizedException(res);
    }
    req.user = payload;
    next();
  } catch (error) {
    return new UnAuthorizedException(res);
  }
};
