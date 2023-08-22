import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { httpStatusCode } from '../constants/constants.httpStatusCode';

export const ResultValidate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(httpStatusCode.SERVER_INTERVEL).json({
        success: false,
        errors: errors.array(),
      });
    }
    next();
  } catch {}
};
