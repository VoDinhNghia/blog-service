import { Request, Response, NextFunction } from 'express';
import { likeMsg } from '../constants/constants.message-response';
import { CommonException } from '../exceptions/exceptions.common-error';
import { ElikeType } from '../constants/constant';

export const validBodyLike = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { type } = req.body;
    if (!Object.values(ElikeType).includes(type)) {
      return new CommonException(res, 400, likeMsg.validate.type);
    }
    next();
  } catch {}
};
