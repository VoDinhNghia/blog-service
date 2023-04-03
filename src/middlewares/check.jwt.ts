import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { config, expireToken } from '../config/config';
import { UnAuthorizedException } from '../exceptions/exceptions.unauthorized';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = <string>req.headers['auth'];
  let jwtPayload;
  try {
    jwtPayload = jwt.verify(token, config.jwtSecret);
    res.locals.jwtPayload = jwtPayload;
    const { userId, username } = jwtPayload;
    const newToken = jwt.sign({ userId, username }, config.jwtSecret, {
      expiresIn: expireToken,
    });
    res.setHeader('token', newToken);
    next();
  } catch {
    return new UnAuthorizedException(res);
  }
};
