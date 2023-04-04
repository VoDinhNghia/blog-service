import { Request, Response, NextFunction } from 'express';
import { postMsg } from '../constants/constants.message-response';
import { CommonException } from '../exceptions/exceptions.common-error';

export const validBodyPost = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, content, type } = req.body;
    console.log(req.body);
    if (!title || !content || !type) {
      return new CommonException(res, 400, postMsg.validate.fields);
    }
    next();
  } catch {}
};
