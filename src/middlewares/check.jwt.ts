/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { config, expireToken } from '../config/config';
import { UnAuthorizedException } from '../exceptions/exceptions.unauthorized';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = <string>req.headers['auth'];
  let jwtPayload;
  try {
    jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    new UnAuthorizedException(res);
    return;
  }
  const { userId, username } = jwtPayload;
  const newToken = jwt.sign({ userId, username }, config.jwtSecret, {
    expiresIn: expireToken,
  });
  res.setHeader('token', newToken);
  next();
};
