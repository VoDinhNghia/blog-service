import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { config, expireToken } from '../configs/config';
import { UnAuthorizedException } from '../exceptions/exceptions.unauthorized';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];
  let jwtPayload;
  try {
    jwtPayload = jwt.verify(token.split(' ')[1], config.JWT_PRIVATE_KEY, {
      algorithms: ['HS512'],
    });
    res.locals.jwtPayload = jwtPayload;
    const { userId, username } = jwtPayload;
    const newToken = jwt.sign({ userId, username }, config.JWT_PRIVATE_KEY, {
      algorithm: 'HS512',
      expiresIn: expireToken,
    });
    res.setHeader('token', newToken);
    next();
  } catch (error) {
    console.log(error);
    return new UnAuthorizedException(res);
  }
};
