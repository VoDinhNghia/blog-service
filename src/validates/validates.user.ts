import { Request, Response, NextFunction } from 'express';
import { CommonException } from '../exceptions/exceptions.common-error';
import { validate } from 'class-validator';
import { User } from '../entities/user.entity';

export const validBodyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let user = new User();
    user = { ...req.body };
    const errors = await validate(user);
    if (errors.length > 0) {
      new CommonException(res, 400, errors);
      return;
    }
    next();
  } catch {}
};
